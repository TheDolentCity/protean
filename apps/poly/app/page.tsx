import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // Protected route
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(`/signin?redirect_uri=${`/`}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-gradient-to-b from-base-950 to-base-950">
      <div className="relative z-10 flex flex-col max-w-lg p-12 items-center">
        <div className="absolute -z-10 left-1/2 top-1/2 w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2 blur-[100px] opacity-10 bg-primary-500" />
        <h2 className="text-8xl text-focus tracking-tighter leading-none font-semibold">
          Protean
        </h2>
        <div className="w-full h-px mt-4 bg-gradient-to-r from-primary-700 via-primary-950 to-primary-700" />
        <h1 className="text-8xl tracking-tighter leading-tight font-bold app-title">
          Poly
        </h1>
        <p className="mt-8 text-lg text-default">
          {`Roll dice with friends in realtime. If you're unsure how to use this
          app, contact the owner. If you don't know the owner is, you shouldn't
          be here.`}
        </p>
      </div>
    </main>
  );
}
