import "./globals.css";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import { CopyRight } from "../components/Copyright";
import { Hero } from "../components/Hero";
import { Profile } from "../components/Profile";
import { SignIn } from "../components/SignIn";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const bai = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-bai-jamjuree",
});

export const metadata: Metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next.js 13, TailwindCSS e TypeScript durante a NLW Spacetime da Rocketseat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("nlw-spacetime-token");

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${bai.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div
            className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-starts.svg)] bg-cover
      px-28 py-16"
          >
            <div
              className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full
         bg-purple-700 opacity-50 blur-full"
            />

            <div className="absolute bottom-0 right-2 top-0 w-2  bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />
            <CopyRight />
          </div>

          <div className="flex flex-col bg-[url(../assets/bg-starts.svg)] bg-cover p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
