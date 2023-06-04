import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database.types";

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

  const { data: user } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", id)
    .limit(1)
    .single();

  if (!user) {
    notFound();
  }

  return NextResponse.json(user);
}
