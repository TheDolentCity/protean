export default function AuthFormButtons({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col px-12 pb-6">{children}</div>;
}
