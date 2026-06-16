import { NextRequest } from "next/server";
import { jsonOk, jsonError, handleApiError } from "@/lib/api-utils";
import {
  hashPassword,
  verifyPassword,
  createToken,
  setAuthCookie,
  getSessionUser,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return jsonError("请填写姓名、邮箱和密码");
    }

    if (password.length < 6) {
      return jsonError("密码至少 6 位");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return jsonError("该邮箱已注册");
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, name, passwordHash },
    });

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
