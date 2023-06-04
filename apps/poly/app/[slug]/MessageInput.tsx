"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function MessageInput({
  slug,
  user_id,
}: {
  slug: string;
  user_id: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");

      const { message } = Object.fromEntries(new FormData(e.currentTarget));

      await fetch(`https://localhost:3000/api/v1/channels/${slug}/messages`, {
        method: "POST",
        body: JSON.stringify({ message, user_id }),
      });
    } catch (error) {
      setError("Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="message"
        placeholder="Send message..."
        className="w-full px-3 py-3 rounded border border-base-900 bg-base-950 text-default placeholder:text-default focus:text-focus focus:border-base-800 focus:bg-base-900 focus:outline-none"
      />
      {error ? <p className="font-medium text-red-700">{error}</p> : <></>}
    </form>
  );
}
