"use client";

import { useSearchParams } from "next/navigation";

export default function MessageFormError() {
  const searchParams = useSearchParams();
  const messageError = searchParams.get("messageError");

  if (messageError) {
    return <p className="font-medium text-red-600">{messageError}</p>;
  } else return <></>;
}
