import { CssBuilder } from "@/utilities/css-builder";

export enum Size {
  Xs,
  Sm,
  Md,
  Lg,
  Xl,
}

export default function Persona({
  letters,
  color,
  size = Size.Md,
  loading = false,
}: {
  letters?: string;
  color?: string;
  size?: Size;
  loading?: boolean;
}) {
  const css = new CssBuilder()
    .addClass("uppercase")
    .addClass(
      "flex-none flex items-center justify-center rounded-full animate-pulse",
      loading
    )
    .addClass(
      "flex-none flex items-center justify-center rounded-full acc-focus",
      !loading
    )
    .addClass("w-3 h-3 md:w-4 md:h-4 text-transparent", size === Size.Xs)
    .addClass("w-4 h-4 md:w-6 md:h-6 text-xs text-focus", size === Size.Sm)
    .addClass(
      "w-6 h-6 md:w-8 md:h-8 text-xs md:text-base text-focus",
      size === Size.Md
    )
    .addClass("w-8 h-8 md:w-10 md:h-10 text-lg text-focus", size === Size.Lg)
    .addClass("w-10 h-10 md:w-12 md:h-12 text-lg text-focus", size === Size.Xl)
    .build();

  if (loading) {
    return <div className={css} style={{ backgroundColor: "#27272a" }} />;
  } else
    return (
      <div className={css} style={{ backgroundColor: color }}>
        <span>{letters}</span>
      </div>
    );
}
