import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "@/types/database.types";
import AuthForm from "@/components/auth/AuthForm";
import AuthFormFields from "@/components/auth/AuthFormFields";
import AuthFormButtons from "@/components/auth/AuthFormButtons";
import Textfield from "@/components/inputs/Textfield";
import AuthFormHeader from "@/components/auth/AuthFormHeader";
import AuthFormNotification from "@/components/auth/AuthFormNotification";
import AuthFormError from "@/components/auth/AuthFormError";

export const metadata = {
  title: "Protean Poly | Sign in",
  description: "Sign in or change your password.",
};

export default async function SignIn({
  searchParams: { redirect_uri },
}: {
  searchParams: { redirect_uri: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const handleSignIn = async (formData: FormData) => {
    "use server";

    try {
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));

      const supabase = createServerActionClient<Database>({ cookies });
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      redirect(`/signin?error=${errorMessage}`);
    }

    if (redirect_uri) {
      redirect(redirect_uri);
    } else {
      redirect("/");
    }
  };

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("/signin");
  console.log(session);

  return (
    <div className="flex w-full h-full p-6 items-center justify-center bg-base-950">
      <AuthForm action={handleSignIn}>
        <AuthFormHeader>Poly</AuthFormHeader>
        <AuthFormError />
        <AuthFormNotification />
        <AuthFormFields>
          <Textfield
            id="email"
            name="email"
            type="email"
            label="Email"
            required
          />
          <Textfield
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            minLength={6}
          />
        </AuthFormFields>
        <AuthFormButtons>
          <button
            type="submit"
            className="flex px-6 py-2.5 gap-3 items-center justify-center rounded font-semibold text-sm text-focus text-black bg-white acc-focus"
          >
            Continue
          </button>
          <hr className="my-6 border-t border-base-800" />
          <div className="flex gap-1 items-center text-sm">
            <p>Forgot password?</p>
            <a
              href="/reset-password"
              className="block text-center rounded text-primary-500 hover:underline focus:underline focus:outline-none"
            >
              Reset
            </a>
          </div>
          <div className="flex gap-1 mt-3 items-center text-sm">
            <p>No account?</p>
            <a
              href="/signup"
              className="block text-center rounded text-primary-500 hover:underline focus:underline focus:outline-none"
            >
              Sign up
            </a>
          </div>
        </AuthFormButtons>
      </AuthForm>
    </div>
  );
}
