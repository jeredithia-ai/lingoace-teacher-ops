import { jsonOk, handleApiError } from "@/lib/api-utils";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearAuthCookie();
    return jsonOk({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
