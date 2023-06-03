'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AuthForm from "@/components/auth/AuthForm";
import AuthFormFields from "@/components/auth/AuthFormFields";
import AuthFormButtons from "@/components/auth/AuthFormButtons";
import Textfield from "@/components/inputs/Textfield";
import AuthFormHeader from "@/components/auth/AuthFormHeader";
import AuthFormNotification from "@/components/auth/AuthFormNotification";
import AuthFormError from "@/components/auth/AuthFormError";

import type { Session } from '@supabase/auth-helpers-nextjs'

export default function LoginForm({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
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
      <a
        href="/reset-password"
        className="rounded text-xs hover:underline hover:text-primary-500 focus:underline focus:text-primary-500 focus:outline-none"
      >
        Forgot your password?
      </a>
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
  )
}