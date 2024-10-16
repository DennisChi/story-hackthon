import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}
export default function ChatLayout({ children }: ChatLayoutProps) {
  return <div className="p-8">{children}</div>;
}
