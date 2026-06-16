import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateQAItems } from "@/lib/ai";
import type { MatchAnalysis } from "@/types";

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const session = await prisma.interviewSession.findFirst({
      where: { id, userId: user.id },
    });
    if (!session) return jsonError("会话不存在", 404);
    if (!session.matchAnalysis) return jsonError("请先完成匹配分析");

    const existing = await prisma.qAItem.count({ where: { sessionId: id } });
    if (existing > 0) {
      const items = await prisma.qAItem.findMany({
        where: { sessionId: id },
        orderBy: { sortOrder: "asc" },
      });
      return jsonOk({ items, cached: true });
    }

    const analysis: MatchAnalysis = JSON.parse(session.matchAnalysis);
    const generated = await generateQAItems(
      session.resumeText,
      session.jdText,
      analysis
    );

    await prisma.qAItem.deleteMany({ where: { sessionId: id } });

    const items = await Promise.all(
      generated.map((item, index) =>
        prisma.qAItem.create({
          data: {
            sessionId: id,
            category: item.category,
            question: item.question,
            suggestedAnswer: item.suggestedAnswer,
            sortOrder: index,
          },
        })
      )
    );

    await prisma.interviewSession.update({
      where: { id },
      data: { status: "qa_ready" },
    });

    return jsonOk({ items, cached: false });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const items = await prisma.qAItem.findMany({
      where: {
        sessionId: id,
        session: { userId: user.id },
      },
      orderBy: { sortOrder: "asc" },
    });

    return jsonOk({ items });
  } catch (error) {
    return handleApiError(error);
  }
}
