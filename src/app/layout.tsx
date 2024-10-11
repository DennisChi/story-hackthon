import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";
import ContextProvider from "@/components/context-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="bg-background">
      <body className="antialiased bg-background">
        <ContextProvider cookies={cookies}>
          <Navbar />
          <Toaster />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
