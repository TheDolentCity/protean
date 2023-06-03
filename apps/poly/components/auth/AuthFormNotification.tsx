"use client";

import { useSearchParams } from "next/navigation";
import { FiInfo } from "react-icons/fi";

export default function AuthFormNotification() {
  const searchParams = useSearchParams();
  const notification = searchParams.get("notification");

  if (notification) {
    return (
      <div className="flex px-12 py-4 gap-3 items-start font-medium text-lg text-focus outline-base-800 outline outline-1">
        <div className="flex p-1.5 items-center justify-center rounded-full bg-base-600 text-white">
          <FiInfo size={20} />
        </div>
        <p className="mt-0.5">{notification}</p>
      </div>
    );
  } else return null;
}
