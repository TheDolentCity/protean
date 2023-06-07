import Message from "./Message";

export default async function Loading() {
  const messages = new Array<number>(10);

  return (
    <div className="relative z-10 flex flex-col w-screen h-[100svh] min-h-0 overflow-hidden text-default bg-base-950">
      <div className="absolute -z-10 left-1/2 top-1/2 w-[1000px] h-[600px] -translate-x-1/2 -translate-y-1/2 blur-[100px] opacity-10 bg-primary-500" />
      <header className="flex px-4 py-4 justify-between border-b border-base-900 bg-black/10 backdrop-blur-md">
        <h1 className="text-2xl tracking-tight font-semibold text-focus">
          <span>Protean </span>
          <span className="font-bold app-title">Poly</span>
        </h1>
      </header>
      <main className="flex-auto flex flex-col w-2xl min-h-0 gap-4 mx-auto p-8 items-center">
        <div className="grow w-full p-4 overflow-y-auto rounded-lg glass">
          <>
            {new Array<number>(10)?.map((i) => (
              <Message key={i} loading={true} />
            ))}
          </>
        </div>
        <div className="w-full h-12 rounded glass" />
      </main>
    </div>
  );
}
