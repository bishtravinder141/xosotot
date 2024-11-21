import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function Check(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg height={size ?? "1em"} width={size ?? "1em"} {...attrs} fill="none" viewBox="0 0 5 5">
      <path d="M1 2.71429L2.125 4L4 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
