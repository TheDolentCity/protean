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
    params: { slug: string };
  }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const slug = params.slug;

  // Protected route
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: channel } = await supabase
    .from("channels")
    .select(`*`)
    .eq("slug", slug)
    .limit(1)
    .single();

  if (!channel) {
    notFound();
  }

  return NextResponse.json(channel);
}
