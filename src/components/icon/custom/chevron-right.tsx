import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function ChevronRight(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg height={size ?? "1em"} width={size ?? "1em"} {...attrs} fill="none" viewBox="0 0 5 6">
      <path
        d="M1.44423 0.777771L3.38867 2.72222L1.44423 4.66666"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}
