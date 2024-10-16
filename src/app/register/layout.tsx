import React from "react";

interface RegisterLayoutProps {
  children: React.ReactNode;
}
export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return <div className="p-8">{children}</div>;
}
