import React from "react";

interface PassportLayoutProps {
  children: React.ReactNode;
}
export default function PassportLayout({ children }: PassportLayoutProps) {
  return <div className="p-8">{children}</div>;
}
