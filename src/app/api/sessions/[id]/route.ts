import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { MatchAnalysis } from "@/types";

type Params = { params: Promise<{ id: string }> };

async function getOwnedSession(sessionId: string, userId: string) {
  const session = await prisma.interviewSession.findFirst({
    where: { id: sessionId, userId },
    include: {
      qaItems: { orderBy: { sortOrder: "asc" } },
      voiceMessages: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!session) return null;
  return session;
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const session = await getOwnedSession(id, user.id);
    if (!session) return jsonError("会话不存在", 404);

    const analysis: MatchAnalysis | null = session.matchAnalysis
      ? JSON.parse(session.matchAnalysis)
      : null;

    return jsonOk({ session, analysis });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const session = await getOwnedSession(id, user.id);
    if (!session) return jsonError("会话不存在", 404);

    await prisma.interviewSession.delete({ where: { id } });
    return jsonOk({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
