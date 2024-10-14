"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useAccount } from "wagmi";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ChatPage() {
  const { address } = useAccount();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
  });

  return (
    <div className="p-4 mt-12">
      <Card className="max-w-4xl m-auto flex flex-col">
        <CardHeader>
          <CardTitle>Chat with your NPC avatar</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="overflow-auto h-[60dvh] mb-4 scrollbar">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-4 mb-4">
                <div className="w-8">
                  {message.role === "user" ? (
                    <Image
                      src="/images/user-circle.svg"
                      alt="user"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/images/robot-icon.svg"
                      alt="user"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <p className="flex-1">{message.content}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-2xl">Start the conversation</p>
              </div>
            )}
          </div>
          <form
            className="flex gap-4 bottom-0"
            onSubmit={(event) => {
              if (!address) return;
              handleSubmit(event, {
                body: {
                  address,
                },
              });
            }}
          >
            <Input name="prompt" value={input} onChange={handleInputChange} />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
