import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("nlw-spacetime-token")?.value;

  if (!token) {
    return NextResponse.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      {
        headers: {
          "Set-Cookie": `redirectTo=${request.url}; Path=/; HttpOnly; max-age=10`,
        },
      },
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/memories/:path*",
};
