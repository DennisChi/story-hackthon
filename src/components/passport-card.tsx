"use client";

import { User } from "@/app/actions";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { redirect } from "next/navigation";
import Image from "next/image";
export interface PassportCardProps {
  user: User;
}

export default function PassportCard({ user }: PassportCardProps) {
  if (!user.passport) {
    redirect("/register");
  }

  return (
    <div className="p-4 max-w-4xl m-auto mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">GamePlus Passport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-12 justify-between">
            <div className="flex flex-col items-center gap-2">
              <div>
                <Image
                  className="rounded-full"
                  src={user.passport.rawAvatar}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-lg font-bold">{user.passport?.nickname}</p>
            </div>
            <div className="border-r border-border" />
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <Image
                  src="/images/x-logo.png"
                  alt="X"
                  width={20}
                  height={20}
                />
              </div>
              {/* TODO: 1. username; 2. tags; */}
            </div>
            <div className="border-r border-border" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-2 items-center font-semibold">
                <span>
                  <Image
                    src="/images/steam-logo.png"
                    alt="Steam"
                    width={20}
                    height={20}
                  />
                </span>
                <span>Steam</span>
              </div>
              {/* TODO: 1. username; 2. tags; */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
