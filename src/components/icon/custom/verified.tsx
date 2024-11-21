import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function Verified(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 10 10">
      <path d="M3.45455 9.54545L2.59091 8.09091L0.954545 7.72727L1.11364 6.04545L0 4.77273L1.11364 3.5L0.954545 1.81818L2.59091 1.45455L3.45455 0L5 0.659091L6.54545 0L7.40909 1.45455L9.04545 1.81818L8.88636 3.5L10 4.77273L8.88636 6.04545L9.04545 7.72727L7.40909 8.09091L6.54545 9.54545L5 8.88636L3.45455 9.54545ZM4.52273 6.38636L7.09091 3.81818L6.45455 3.15909L4.52273 5.09091L3.54545 4.13636L2.90909 4.77273L4.52273 6.38636Z" />
    </svg>
  );
}
