import type { SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SpinnerProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function Spinner(props: SpinnerProps) {
  const { size, className, ...attrs } = props;

  return (
    <svg
      height={size ?? "1em"}
      width={size ?? "1em"}
      {...attrs}
      className={twMerge("mr-1.5 animate-spin", className)}
      fill="none"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" opacity={0.25} r="7" stroke="currentColor" strokeWidth={2} />
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="currentColor"
        strokeDasharray="32 12"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </svg>
  );
}
