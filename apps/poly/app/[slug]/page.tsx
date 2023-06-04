import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import type { Database } from "@/types/database.types";
import type { Channel, MessageWithAuthor } from "@/types/app.types";

export default async function Post({
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

  async function getMessages(): Promise<Array<MessageWithAuthor> | null> {
    return messages;
  }

  const channel = await fetch(
    `http://localhost:3000/api/v1/channels/by-name/${slug}/`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => data as Channel);
  console.log(channel);

  const user = await fetch(
    `http://localhost:3000/api/v1/users/${session?.user?.id}/`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => data as Channel);
  console.log(user);

  const { data: messages } = await supabase
    .from("messages")
    .select("*, author:user_id(*)")
    .eq("channel_id", channel?.id)
    .order("inserted_at", { ascending: false })
    .returns<Array<MessageWithAuthor>>();
  console.log(messages);

  return (
    <div className="flex flex-col w-screen h-[100svh] text-default bg-black">
      <header className="flex px-4 py-4 justify-between border-b border-base-900 bg-base-950">
        <h1 className="text-2xl tracking-tight font-semibold text-focus">
          <span>Protean </span>
          <span className="font-bold app-title">Poly</span>
        </h1>
      </header>
      <main className="flex-auto flex flex-col w-2xl gap-4 mx-auto p-8 items-center">
        <div className="grow w-full p-4 overflow-y-auto rounded border border-base-900 bg-base-950">
          {messages ? <Messages serverMessages={messages} /> : <></>}
        </div>
        <MessageInput slug={slug} user_id={""} />
      </main>
    </div>
  );
}
