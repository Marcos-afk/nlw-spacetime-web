import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";

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
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${bai.variable} bg-gray-900 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
