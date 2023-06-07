import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MessageFormError from "./MessageFormError";
import { revalidatePath } from "next/cache";
import { Message } from "@/types/app.types";

export default function MessageForm({
  channel_id,
  user_id,
  slug,
}: {
  channel_id: number;
  user_id: string;
  slug: string;
}) {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    try {
      const supabase = createServerActionClient<Database>({ cookies });
      const message = formData?.get("message") as string;

      console.log("handleSubmit");
      console.log(message);
      console.log(channel_id);
      console.log(user_id);

      const { data: responseMessage } = await supabase
        .from("messages")
        .insert([
          { message: message, channel_id: channel_id, user_id: user_id },
        ])
        .select()
        .single();

      console.log(
        `MessageForm:submit:response:${JSON.stringify(
          responseMessage,
          null,
          2
        )}`
      );
    } catch (error) {
      console.log(error);
      console.log(`MessageForm:submit:error:${JSON.stringify(error, null, 2)}`);
      redirect(`/${slug}?messageError=${"Failed to submit message"}`);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="fixed bottom-8 left-4 right-4 flex flex-col items-center gap-2"
    >
      <input
        name="message"
        placeholder="Send message..."
        className="w-full max-w-2xl px-3 py-3 rounded text-default placeholder:text-default focus:text-focus focus:outline-none glass"
      />
      <MessageFormError />
    </form>
  );
}
