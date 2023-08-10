import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../lib/axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const redirectTo = req.cookies.get("redirectTo")?.value;

  const { data } = await api.post("/register", { code });

  const redirectUrl = redirectTo ?? new URL("/", req.url);
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30; // 30 days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `nlw-spacetime-token=${data.token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  });
}
