"use client";

import { User } from "@/app/actions";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
export interface PassportCardProps {
  user: User;
}

export default function PassportCard({ user }: PassportCardProps) {
  const router = useRouter();
  if (!user.passport) {
    redirect("/register");
  }

  return (
    <Card className="max-w-4xl m-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Passport</CardTitle>
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
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <Image src="/images/x-logo.png" alt="X" width={20} height={20} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {user.twitterTags?.map((tag) => (
                <Badge className="h-6 text-sm" key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="border-r border-border" />
          <div className="flex-1 flex flex-col gap-4">
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
            <div className="flex gap-2 flex-wrap">
              {user.steamTags?.map((tag) => (
                <Badge className="h-6 text-sm" key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Button
            className="w-full h-12 text-xl"
            onClick={() => router.push("/chat")}
          >
            Come and experience your NPC avatar now!
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
