"use client";

import { useSearchParams } from "next/navigation";
import { FiAlertCircle } from "react-icons/fi";

export default function AuthFormError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) {
    return (
      <div className="flex px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1">
        <div className="flex p-1.5 items-center justify-center rounded-full bg-red-600 text-white">
          <FiAlertCircle size={20} />
        </div>
        <p className="mt-0.5">{error}</p>
      </div>
    );
  } else return null;
}
