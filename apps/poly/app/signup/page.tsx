import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { Database } from "@/types/database.types";

export default async function SignUp() {
  const handleSignUp = async (formData: FormData) => {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    revalidatePath("/");
  };

  return (
    <form action={handleSignUp}>
      <input name="email" />
      <input type="password" name="password" />
      <button>Sign in</button>
    </form>
  );
}
