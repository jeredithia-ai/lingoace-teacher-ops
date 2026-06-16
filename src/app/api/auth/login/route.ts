import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import {
  verifyPassword,
  createToken,
  setAuthCookie,
  getSessionUser,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return jsonError("请填写邮箱和密码");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return jsonError("邮箱或密码错误");
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    await setAuthCookie(token);

    return jsonOk({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) return jsonError("未登录", 401);
    return jsonOk({ user });
  } catch (error) {
    return handleApiError(error);
  }
}
