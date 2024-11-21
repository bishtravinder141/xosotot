import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function ArrowFilled(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 14 8">
      <path
        clipRule="evenodd"
        d="M7.41479 1.57508L10.7147 4.875L9.88987 5.69983L7.00237 2.81233L4.11487 5.69983L3.29004 4.875L6.58996 1.57508C6.69935 1.46572 6.84769 1.40429 7.00237 1.40429C7.15705 1.40429 7.3054 1.46572 7.41479 1.57508Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
