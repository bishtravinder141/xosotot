import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function FireFill(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 18 18">
      <path d="M9.00001 17.25C7.87287 17.2499 6.77176 16.9112 5.83944 16.2778C4.90712 15.6444 4.18659 14.7455 3.77127 13.6976C3.35595 12.6498 3.26501 11.5014 3.51022 10.4012C3.75544 9.30111 4.3255 8.30001 5.14651 7.52775C6.15301 6.5805 8.62501 4.875 8.25001 1.125C12.75 4.125 15 7.125 10.5 11.625C11.25 11.625 12.375 11.625 14.25 9.7725C14.4525 10.3523 14.625 10.9755 14.625 11.625C14.625 13.1168 14.0324 14.5476 12.9775 15.6025C11.9226 16.6574 10.4919 17.25 9.00001 17.25Z" />
    </svg>
  );
}
