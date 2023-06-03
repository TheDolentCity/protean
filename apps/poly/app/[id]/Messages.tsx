"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MessageWithAuthor } from "./page";
import type { Database } from "@/types/database.types";
import Message from "./Message";

export default function Messages({
  serverMessages,
}: {
  serverMessages: Array<MessageWithAuthor | null>;
}) {
  const supabase = createClientComponentClient<Database>();
  const [messages, setMessages] = useState(serverMessages);

  // Update client messages if server messages change
  useEffect(() => {
    setMessages(serverMessages);
  }, [serverMessages]);

  // Configure supabase realtime
  useEffect(() => {
    const realtime = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log(`Realtime:${JSON.stringify(payload)}`);
          setMessages((messages) => [
            ...messages,
            payload.new as MessageWithAuthor,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(realtime);
    };
  }, [supabase, messages, setMessages]);

  return (
    <div className="flex flex-col w-full h-full gap-2">
      {messages?.map((message, i) => (
        <Message
          key={message?.id}
          author={message?.author}
          message={message?.message}
          timestamp={message?.inserted_at}
          starting={
            i - 1 < 0 || messages?.at(i - 1)?.author?.id !== message?.author?.id
          }
        />
      ))}
    </div>
  );
}
