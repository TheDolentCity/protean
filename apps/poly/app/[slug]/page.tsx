import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import type { Database } from "@/types/database.types";
import type { Channel, MessageWithAuthor, User } from "@/types/app.types";

interface PageData {
  channel: Channel | null;
  user: User | null;
  messages: Array<MessageWithAuthor> | null;
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // Protected route
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(`/signin?redirect_uri=${`/${slug}`}`);
  }

  // async function load(): Promise<PageData> {
  //   let pageData: PageData = {
  //     channel: null,
  //     user: null,
  //     messages: null,
  //   };

  //   try {
  //     pageData.channel = await fetch(
  //       `http://localhost:3000/api/v1/channels/by-name/${slug}/`,
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => data as Channel);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   try {
  //     pageData.user = await fetch(
  //       `http://localhost:3000/api/v1/users/${session?.user?.id}/`,
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => data as User);
  //     console.log(pageData.user);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   try {
  //     pageData.messages = await fetch(
  //       `http://localhost:3000/api/v1/channels/${pageData?.channel?.id}/messages/`,
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => data as Array<MessageWithAuthor>);
  //     console.log(pageData.messages);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   return pageData;
  // }

  const { data: channel, error: channelError } = await supabase
    .from("channels")
    .select(`*`)
    .eq("slug", slug)
    .limit(1)
    .single();
  if (!channel) {
    notFound();
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", session?.user?.id)
    .limit(1)
    .single();
  if (!user) {
    notFound();
  }

  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("*, author:user_id(*)")
    .eq("channel_id", channel?.id)
    .order("inserted_at", { ascending: true })
    .returns<Array<MessageWithAuthor>>();
  console.log(messages);
  if (!messages) {
    notFound();
  }

  return (
    <div className="relative z-20 flex flex-col w-screen h-[100svh] min-h-0 items-center overflow-y-scroll text-default bg-base-950">
      {/* <div className="absolute -z-10 left-1/2 top-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-10 bg-primary-500" /> */}
      <header className="fixed z-10 top-0 left-0 right-0 flex px-4 h-16 items-center justify-between border-b border-base-900 bg-black/10 backdrop-blur-md">
        <h1 className="text-2xl tracking-tight font-semibold text-focus">
          <span>Protean </span>
          <span className="font-bold app-title">Poly</span>
        </h1>
      </header>
      <main className="w-2xl p-8 my-16 items-center">
        {messages ? <Messages serverMessages={messages} /> : <></>}
      </main>
      <MessageForm channel_id={channel?.id} user_id={user?.id} slug={slug} />
    </div>
  );
}
