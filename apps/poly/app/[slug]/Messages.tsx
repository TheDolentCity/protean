"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Message from "./Message";
import type { Database } from "@/types/database.types";
import type { MessageWithAuthor } from "@/types/app.types";

export default function Messages({
  serverMessages,
}: {
  serverMessages: Array<MessageWithAuthor>;
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
          const newMessage = payload?.new as MessageWithAuthor;
          if (
            newMessage &&
            messages?.at(0)?.channel_id === newMessage?.channel_id
          ) {
            setMessages((messages) => [...messages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(realtime);
    };
  }, [supabase, messages, setMessages]);

  return (
    <div className="flex flex-col w-full h-full">
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
