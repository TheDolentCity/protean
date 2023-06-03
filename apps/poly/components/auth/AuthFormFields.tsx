export default function AuthFormFields({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-6 px-12 py-6">{children}</div>;
}
