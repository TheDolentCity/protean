import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";
import Message from "@/app/[id]/Message";
import Messages from "./Messages";

export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type MessageWithAuthor = Message & {
  author: User;
};

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // Protected route
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect(`/signin?redirect_uri=${`/${id}`}`);
  }

  async function getMessages(): Promise<Array<MessageWithAuthor> | null> {
    const { data: messages } = await supabase
      .from("messages")
      .select("*, author:user_id(*)")
      .eq("channel_id", id)
      .order("inserted_at", { ascending: false })
      .returns<Array<MessageWithAuthor>>();
    console.log(messages);
    return messages;
  }

  const messages = await getMessages();
  if (!messages) {
    notFound();
  }

  return (
    <div className="flex flex-col w-screen h-[100svh] text-default bg-black">
      <header className="flex px-4 py-4 justify-between border-b border-base-900 bg-base-950">
        <h1 className="text-2xl tracking-tight font-semibold text-focus">
          <span>Protean </span>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500">
            Poly
          </span>
        </h1>
      </header>
      <main className="flex-auto flex flex-col w-xl gap-4 mx-auto p-8 items-center">
        <div className="grow w-full p-4 overflow-y-auto rounded border border-base-900 bg-base-950">
          <Messages serverMessages={messages} />
        </div>
        <input className="w-full px-3 py-1 rounded border border-base-900 bg-base-950" />
      </main>
    </div>
  );
}
