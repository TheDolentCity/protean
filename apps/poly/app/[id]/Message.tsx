import Persona from "../../components/account/Persona";
import { User } from "./page";

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
  message: string | null | undefined;
  timestamp?: string | null | undefined;
}) {
  const authorText = author?.nickname ?? author?.username ?? "Unknown user";
  const color = author?.color ?? "27272a";

  if (loading) {
    return (
      <div className="flex w-full gap-3 mt-6 first:mt-0 px-4 items-start overflow-hidden rounded-md text-default">
        <Persona />
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
      <div className="flex w-full gap-3 mt-6 first:mt-0 px-4 items-start overflow-hidden text-default">
        <Persona />
        <div className="flex-auto flex flex-col min-w-0">
          <h3 className="align-baseline truncate">
            <span className="mr-1 text-focus">{authorText}</span>
            {/* <Time relative {timestamp} className="text-xs text-base-500" /> */}
          </h3>
          <p className="text-base-400">{message}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex w-full pl-[3.25rem] md:pl-[3.75rem] pr-4 gap-3 items-start overflow-hidden text-default">
        <p className="flex-auto text-base-400">{message}</p>
      </div>
    );
}
