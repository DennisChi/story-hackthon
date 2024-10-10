import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import ContextProvider from "@/components/context-provider";

export const metadata: Metadata = {
  title: "GamePlus",
  description: "GamePlus for Story Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en">
      <body className="antialiased">
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
