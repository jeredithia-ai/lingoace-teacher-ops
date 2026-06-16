import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Params = { params: Promise<{ id: string; itemId: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const user = await requireUser();
    const { id: sessionId, itemId } = await params;
    const body = await request.json();

    const item = await prisma.qAItem.findFirst({
      where: {
        id: itemId,
        sessionId,
        session: { userId: user.id },
      },
    });
    if (!item) return jsonError("问题不存在", 404);

    const updated = await prisma.qAItem.update({
      where: { id: itemId },
      data: {
        ...(body.userNotes !== undefined && { userNotes: body.userNotes }),
        ...(body.isStarred !== undefined && { isStarred: body.isStarred }),
        ...(body.suggestedAnswer !== undefined && {
          suggestedAnswer: body.suggestedAnswer,
        }),
      },
    });

    return jsonOk({ item: updated });
  } catch (error) {
    return handleApiError(error);
  }
}
