"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

interface FormSchema {
  nickname: string;
}

export interface RegisterFormProps {
  twitterConnected: boolean;
  steamConnected: boolean;
}

const fileToHexString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      const hexString = Array.from(uint8Array)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      resolve(hexString);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export default function RegisterForm({
  twitterConnected,
  steamConnected,
}: RegisterFormProps) {
  const { address } = useAccount();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const form = useForm<FormSchema>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const connectTwitter = () => {
    if (twitterConnected) return;
    if (!address) {
      toast({ title: "Please connect your wallet" });
      return;
    }
    window.open(
      `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=ZjdBQWI1ZVBVYWRpNWVxWTFvSUQ6MTpjaQ&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/twitter&scope=tweet.read+users.read+offline.access&state=${address}&code_challenge=challenge&code_challenge_method=plain`
    );
  };

  const connectSteam = () => {
    if (steamConnected) return;
    if (!address) {
      toast({ title: "Please connect your wallet" });
      return;
    }
    window.open(
      `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.mode=checkid_setup&openid.return_to=${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/steam?address=${address}&openid.realm=${process.env.NEXT_PUBLIC_BASE_URL}&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`
    );
  };

  const onSubmit = async (data: FormSchema) => {
    if (!file) {
      toast({ title: "Please upload an avatar" });
      return;
    }
    if (!twitterConnected) {
      toast({ title: "Please connect X" });
      return;
    }
    if (!steamConnected) {
      toast({ title: "Please connect Steam" });
      return;
    }

    setIsSubmitting(true);
    const hexString = await fileToHexString(file);
    fetch("/api/passport", {
      method: "POST",
      body: JSON.stringify({ ...data, address, avatar: hexString }),
    })
      .then(() => {
        router.replace("/passport");
      })
      .catch((err) => {
        toast({ title: "Error registering", description: err.message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="p-4">
      <Card className="max-w-4xl m-auto my-16">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register to start your journey with GamePlus
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2 justify-center items-center w-24">
                  <div className="overflow-hidden rounded-full bg-popover relative flex justify-center items-end">
                    {file ? (
                      <Image
                        className="object-cover"
                        src={URL.createObjectURL(file)}
                        alt="Avatar preview"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <Image
                        className="object-cover p-4 cursor-pointer bg-card border border-border rounded-full hover:border-primary"
                        src="/images/upload-icon.svg"
                        alt="Avatar preview"
                        width={64}
                        height={64}
                        onClick={() => avatarInputRef.current?.click()}
                      />
                    )}
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setFile(file);
                      }}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  className="bg-black flex justify-center items-center gap-2 hover:bg-[hsl(240,5.9%,10%)]"
                  type="button"
                  size="lg"
                  onClick={connectTwitter}
                >
                  <span>
                    <Image
                      src={
                        twitterConnected
                          ? "/images/check-circle.svg"
                          : "/images/x-logo.png"
                      }
                      alt="X"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span>{twitterConnected ? "X Connected" : "Connect X"}</span>
                </Button>

                <Button
                  className="bg-[#1b293a] flex justify-center items-center gap-2 hover:bg-[#171d25]"
                  type="button"
                  size="lg"
                  onClick={connectSteam}
                >
                  <span>
                    <Image
                      src={
                        steamConnected
                          ? "/images/check-circle.svg"
                          : "/images/steam-logo.png"
                      }
                      alt="Steam"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span>
                    {steamConnected ? "Steam Connected" : "Connect Steam"}
                  </span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                loading={isSubmitting}
                loadingText="Submitting..."
                type="submit"
              >
                Register
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
