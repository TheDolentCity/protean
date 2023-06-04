import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database.types";
import { notFound, redirect } from "next/navigation";

export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type MessageWithAuthor = Message & {
  author: User;
};

export async function GET(
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

  const { data: channel } = await supabase
    .from("channels")
    .select(`*`)
    .eq("id", id)
    .limit(1)
    .single();

  if (!channel) {
    notFound();
  }

  return NextResponse.json(channel);
}
