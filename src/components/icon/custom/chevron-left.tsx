import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function ChevronLeft(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg height={size ?? "1em"} width={size ?? "1em"} {...attrs} fill="none" viewBox="0 0 6 9">
      <path d="M4.5 1L1 4.5L4.5 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
