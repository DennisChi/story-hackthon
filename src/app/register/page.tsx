"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
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

const formSchema = z.object({
  nickname: z.string().min(4).max(16),
});
type FormSchema = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [xConnected, setXConnected] = useState(false);
  const [steamConnected, setSteamConnected] = useState(false);
  const form = useForm<FormSchema>();
  const { toast } = useToast();

  const connectX = () => {
    console.log("connectX");
  };

  const connectSteam = () => {
    console.log("connectSteam");
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({ title: "Please upload an avatar" });
      return;
    }
    if (!xConnected) {
      toast({ title: "Please connect X" });
      return;
    }
    if (!steamConnected) {
      toast({ title: "Please connect Steam" });
      return;
    }
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
                  <div className="w-16 h-16 overflow-hidden rounded-full bg-popover relative flex justify-center items-end">
                    {file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Avatar preview"
                        className="object-cover"
                      />
                    ) : (
                      <img
                        src="/images/upload-icon.svg"
                        alt="Avatar preview"
                        className="object-cover p-4 cursor-pointer bg-card border border-border rounded-full hover:border-primary"
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
                  onClick={connectX}
                >
                  <span>
                    <Image
                      src={
                        xConnected
                          ? "/images/check-circle.svg"
                          : "/images/x-logo.png"
                      }
                      alt="X"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span>{xConnected ? "X Connected" : "Connect X"}</span>
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
              <Button type="submit">Register</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
