import type { Database } from "@/types/database.types";

export type Channel = Database["public"]["Tables"]["channels"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type MessageWithAuthor = Message & {
  author: User;
};
export type User = Database["public"]["Tables"]["users"]["Row"];
