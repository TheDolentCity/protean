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
    <main className="flex min-h-screen items-center justify-center p-24 bg-black">
      <div className="max-w-lg p-12 rounded-lg border border-base-900 bg-base-950">
        <div className="flex gap-6 mb-4 items-end">
          <h1 className="text-6xl text-focus tracking-tighter font-semibold">
            <span>Protean </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-600">
              Poly
            </span>
          </h1>
        </div>
        <p className="text-lg text-default">
          Roll dice with friends in realtime. If you're unsure how to use this
          app, contact the owner. If you don't know the owner is, you shouldn't
          be here.
        </p>
      </div>
    </main>
  );
}
