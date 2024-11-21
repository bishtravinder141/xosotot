import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function TopAppBarTitle(props: HTMLAttributes<HTMLSpanElement>) {
  return (
    <p {...props} className={twMerge("-my-0.5 flex h-10 items-center", props.className)}>
      <span className="font-bold leading-tight">{props.children}</span>
    </p>
  );
}
