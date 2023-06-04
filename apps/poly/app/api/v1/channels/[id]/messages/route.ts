import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database.types";
import type { MessageWithAuthor } from "@/types/app.types";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const id = params.id;

  // Protected route
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/signin");
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("*, author:user_id(*)")
    .eq("channel_id", id)
    .order("inserted_at", { ascending: false })
    .returns<Array<MessageWithAuthor>>();

  if (!messages) {
    notFound();
  }

  return NextResponse.json(messages);
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { id: number };
  }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const id = params.id;

  // Protected route
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/signin");
  }

  const { message, user_id } = await request.json();

  let { data: responseMessage } = await supabase
    .from("messages")
    .insert([{ message, channel_id: id, user_id }])
    .select()
    .single();

  return NextResponse.json({ id: responseMessage?.id });
}
