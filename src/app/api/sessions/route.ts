import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { extractTextFromFile, validateTextContent } from "@/lib/file-parser";
import { analyzeMatch } from "@/lib/ai";
import type { MatchAnalysis } from "@/types";

export async function GET() {
  try {
    const user = await requireUser();
    const sessions = await prisma.interviewSession.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        companyName: true,
        positionTitle: true,
        matchScore: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { qaItems: true, voiceMessages: true } },
      },
    });
    return jsonOk({ sessions });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const formData = await request.formData();

    const resumeFile = formData.get("resumeFile") as File | null;
    const resumeTextInput = formData.get("resumeText") as string | null;
    const jdFile = formData.get("jdFile") as File | null;
    const jdTextInput = formData.get("jdText") as string | null;
    const title = (formData.get("title") as string) || "新面试准备";

    let resumeText = resumeTextInput?.trim() || "";
    let resumeFileName: string | null = null;

    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      resumeText = await extractTextFromFile(buffer, resumeFile.name);
      resumeFileName = resumeFile.name;
    }

    let jdText = jdTextInput?.trim() || "";
    let jdFileName: string | null = null;

    if (jdFile && jdFile.size > 0) {
      const buffer = Buffer.from(await jdFile.arrayBuffer());
      jdText = await extractTextFromFile(buffer, jdFile.name);
      jdFileName = jdFile.name;
    }

    validateTextContent(resumeText, "简历");
    validateTextContent(jdText, "岗位描述");

    const session = await prisma.interviewSession.create({
      data: {
        userId: user.id,
        title,
        resumeText,
        resumeFileName,
        jdText,
        jdFileName,
        status: "draft",
      },
    });

    const matchResult = await analyzeMatch(resumeText, jdText);
    const { companyName, positionTitle, ...analysis } = matchResult;

    const updated = await prisma.interviewSession.update({
      where: { id: session.id },
      data: {
        matchScore: analysis.score,
        matchAnalysis: JSON.stringify(analysis),
        companyName: companyName || null,
        positionTitle: positionTitle || null,
        title:
          companyName && positionTitle
            ? `${companyName} - ${positionTitle}`
            : title,
        status: "matched",
      },
    });

    return jsonOk({
      session: updated,
      analysis: analysis as MatchAnalysis,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
