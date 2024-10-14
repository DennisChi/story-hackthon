"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { open } = useAppKit();
  const { isReconnecting, address } = useAccount();
  const walletButtonContent = address ? (
    <div className="flex items-center gap-2">
      <span>
        <Image src="/images/user.svg" alt="User" width={20} height={20} />
      </span>
      <span className="hidden md:block">
        {address.slice(0, 6)}...{address.slice(-4)}
      </span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <span>
        <Image src="/images/wallet.svg" alt="Wallet" width={20} height={20} />
      </span>
      <span className="hidden md:block">Connect Wallet</span>
    </div>
  );

  const navLinkList = (
    <ul className="flex gap-4 text-foreground text-lg font-semibold">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/passport">Passport</Link>
      </li>
    </ul>
  );

  const navMenuButton = (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border-border border p-2 rounded-md">
          <Image src="/images/bars-3.svg" alt="Menu" width={20} height={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/passport">Passport</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const walletButton = (
    <Button
      loading={isReconnecting}
      loadingText="Connecting..."
      disabled={isReconnecting}
      onClick={() => open()}
    >
      {walletButtonContent}
    </Button>
  );

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
      <div className="md:hidden flex gap-4 items-center">
        {navMenuButton}
        {walletButton}
      </div>
      <div className="hidden md:block">{navLinkList}</div>
      <div className="hidden md:block">{walletButton}</div>
    </div>
  );
}
