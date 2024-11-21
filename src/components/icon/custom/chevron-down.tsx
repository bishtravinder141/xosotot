import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function ChevronDown(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg height={size ?? "1em"} width={size ?? "1em"} {...attrs} fill="none" viewBox="0 0 11 6">
      <path d="M1 5L5.5 1L10 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
