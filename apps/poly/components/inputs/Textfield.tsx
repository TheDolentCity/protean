import type { InputHTMLAttributes } from "react";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Textfield({ label, ...rest }: TextfieldProps) {
  return (
    <label className="block relative w-full max-w-full cursor-pointer">
      {label ? <div className="mb-1 text-sm truncate">{label}</div> : null}
      <input
        className="peer appearance-none w-full px-2 py-1 rounded text-focus cursor-text focus:outline-none focus:caret-base-300 placeholder:text-base-500 bg-base-900 text-base"
        {...rest}
      />
    </label>
  );
}
