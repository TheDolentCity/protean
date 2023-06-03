export default function AuthFormHeader({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <h1 className="px-12 py-8 border-b border-base-800 text-3xl font-semibold tracking-tight text-left">
      <div className="text-default text-lg font-normal tracking-normal mb-2">Protean</div>
      <div className="text-focus">
        {children}
      </div>
    </h1>
  );
}
