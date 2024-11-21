import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type PreviewContainerProps = PropsWithChildren<{
  wrap?: boolean;
  className?: string;
}>;

export default function PreviewContainer(props: PreviewContainerProps) {
  return (
    <div className={twMerge("pointer-events-none select-none rounded-lg", (props.wrap ?? true) && "bg-white")}>
      <div className={twMerge("flex scale-95 flex-col gap-5", (props.wrap ?? true) && "p-1", props.className)}>
        {props.children}
      </div>
    </div>
  );
}
