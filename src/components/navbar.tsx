"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function Navbar() {
  const { open } = useAppKit();
  const { isReconnecting, address } = useAccount();
  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Connect Wallet";

  return (
    <div className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
      <div>
        <Image
          src="/images/navbar-logo.png"
          alt="Game Plus"
          width={200}
          height={100}
        />
      </div>
      <div className="flex gap-4 text-foreground text-lg font-semibold">
        <Link href="/">Home</Link>
        <Link href="/passport">Passport</Link>
      </div>
      <div>
        <Button
          loading={isReconnecting}
          loadingText="Connecting..."
          disabled={isReconnecting}
          onClick={() => open()}
        >
          {displayAddress}
        </Button>
      </div>
    </div>
  );
}
