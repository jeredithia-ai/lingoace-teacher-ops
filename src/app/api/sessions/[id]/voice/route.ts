import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getInterviewerResponse,
  getOpeningQuestion,
  generateVoiceFeedback,
} from "@/lib/ai";
import type { MatchAnalysis } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = await request.json();
    const { action, message } = body;

    const session = await prisma.interviewSession.findFirst({
      where: { id, userId: user.id },
      include: { voiceMessages: { orderBy: { createdAt: "asc" } } },
    });
    if (!session) return jsonError("会话不存在", 404);
    if (!session.matchAnalysis) return jsonError("请先完成匹配分析");

    const analysis: MatchAnalysis = JSON.parse(session.matchAnalysis);

    if (action === "start") {
      await prisma.voiceMessage.deleteMany({ where: { sessionId: id } });

      const opening = await getOpeningQuestion(
        session.resumeText,
        session.jdText,
        analysis
      );

      const msg = await prisma.voiceMessage.create({
        data: { sessionId: id, role: "interviewer", content: opening },
      });

      await prisma.interviewSession.update({
        where: { id },
        data: { status: "voice_in_progress" },
      });

      return jsonOk({ message: msg, messages: [msg] });
    }

    if (action === "respond") {
      if (!message?.trim()) return jsonError("请输入回答内容");

      await prisma.voiceMessage.create({
        data: {
          sessionId: id,
          role: "candidate",
          content: message.trim(),
        },
      });

      const history = await prisma.voiceMessage.findMany({
        where: { sessionId: id },
        orderBy: { createdAt: "asc" },
      });

      const aiHistory = history.map((m) => ({
        role: m.role === "interviewer" ? "assistant" : "user",
        content: m.content,
      }));

      const reply = await getInterviewerResponse(
        session.resumeText,
        session.jdText,
        analysis,
        aiHistory,
        message.trim()
      );

      const interviewerMsg = await prisma.voiceMessage.create({
        data: { sessionId: id, role: "interviewer", content: reply },
      });

      const allMessages = await prisma.voiceMessage.findMany({
        where: { sessionId: id },
        orderBy: { createdAt: "asc" },
      });

      return jsonOk({ message: interviewerMsg, messages: allMessages });
    }

    if (action === "finish") {
      const messages = await prisma.voiceMessage.findMany({
        where: { sessionId: id },
        orderBy: { createdAt: "asc" },
      });

      const transcript = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const feedback = await generateVoiceFeedback(
        session.resumeText,
        session.jdText,
        transcript
      );

      await prisma.interviewSession.update({
        where: { id },
        data: {
          voiceFeedback: JSON.stringify(feedback),
          status: "voice_completed",
          voiceDuration: body.duration || null,
        },
      });

      return jsonOk({ feedback, messages });
    }

    return jsonError("未知操作");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const session = await prisma.interviewSession.findFirst({
      where: { id, userId: user.id },
      include: { voiceMessages: { orderBy: { createdAt: "asc" } } },
    });
    if (!session) return jsonError("会话不存在", 404);

    const feedback = session.voiceFeedback
      ? JSON.parse(session.voiceFeedback)
      : null;

    return jsonOk({
      messages: session.voiceMessages,
      feedback,
      status: session.status,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
