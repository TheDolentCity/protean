export default function AuthForm({
  action,
  children,
}: {
  action: (formData: FormData) => void;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className="flex flex-col min-w-[12rem] w-[24rem] max-w-[24rem] overflow-hidden shadow-xl rounded-md border border-base-800 bg-black"
    >
      {children}
    </form>
  );
}
