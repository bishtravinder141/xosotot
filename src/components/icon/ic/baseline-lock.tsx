import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function BaselineLock(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 16 16">
      <path d="M12.0003 5.33334H11.3337V4.00001C11.3337 2.16001 9.84033 0.666672 8.00033 0.666672C6.16033 0.666672 4.66699 2.16001 4.66699 4.00001V5.33334H4.00033C3.26699 5.33334 2.66699 5.93334 2.66699 6.66667V13.3333C2.66699 14.0667 3.26699 14.6667 4.00033 14.6667H12.0003C12.7337 14.6667 13.3337 14.0667 13.3337 13.3333V6.66667C13.3337 5.93334 12.7337 5.33334 12.0003 5.33334ZM8.00033 11.3333C7.26699 11.3333 6.66699 10.7333 6.66699 10C6.66699 9.26667 7.26699 8.66667 8.00033 8.66667C8.73366 8.66667 9.33366 9.26667 9.33366 10C9.33366 10.7333 8.73366 11.3333 8.00033 11.3333ZM10.067 5.33334H5.93366V4.00001C5.93366 2.86001 6.86033 1.93334 8.00033 1.93334C9.14033 1.93334 10.067 2.86001 10.067 4.00001V5.33334Z" />
    </svg>
  );
}