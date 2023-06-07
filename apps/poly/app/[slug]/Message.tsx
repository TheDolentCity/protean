import { timeAgo } from "@/utilities/time-ago";
import Persona from "./Persona";
import type { User } from "@/types/app.types";

export default function Message({
  loading,
  starting,
  author,
  message,
  timestamp,
}: {
  loading?: boolean;
  starting?: boolean;
  author?: User;
  message?: string | null | undefined;
  timestamp?: string | null | undefined;
}) {
  const authorText = author?.nickname ?? author?.username ?? "Unknown user";
  const color = author?.color ?? "27272a";
  const time = timestamp ? timeAgo(timestamp) : "Unknown timestamp";

  if (loading) {
    return (
      <div className="flex w-full gap-3 mt-6 first:mt-0 items-start overflow-hidden rounded-md text-default">
        <Persona loading />
        <div className="flex-auto flex flex-col min-w-0">
          <h3 className="flex h-6 gap-1 items-baseline truncate">
            <span className="w-16 h-[1rem] rounded-md animate-pulse bg-base-800" />
            <span className="w-10 h-[0.75rem] rounded-md animate-pulse bg-base-800" />
          </h3>
          <p className="inline-block w-64 h-4 rounded-md animate-pulse bg-base-800" />
        </div>
      </div>
    );
  } else if (starting) {
    return (
      <div className="flex flex-col w-full gap-1 mt-6 first:mt-0 overflow-hidden text-default">
        <h3 className="flex items-baseline justify-between truncate">
          <span className="flex gap-2 items-center">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-focus">{authorText}</span>
          </span>
          <span className="text-sm text-base-400">{time}</span>
        </h3>
        <p className="text-base-400">{message}</p>
      </div>
    );
  } else
    return (
      <div className="group flex w-full gap-3 items-baseline justify-between truncate text-default">
        <p className="flex-auto text-base-400">{message}</p>
        <span className="opacity-0 group-hover:opacity-100 text-sm text-base-400 mst">
          {time}
        </span>
      </div>
    );
}
