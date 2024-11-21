import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function RankingBold(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 18 18">
      <path
        d="M15 4.5H3C2.17157 4.5 1.5 5.17157 1.5 6V15C1.5 15.8284 2.17157 16.5 3 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V6C16.5 5.17157 15.8284 4.5 15 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.25 13.5H14.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M1.5 8.25H16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path
        d="M5.25 4.5V2.25C5.25 1.85218 5.40804 1.47064 5.68934 1.18934C5.97064 0.908035 6.35218 0.75 6.75 0.75H11.25C11.6478 0.75 12.0294 0.908035 12.3107 1.18934C12.592 1.47064 12.75 1.85218 12.75 2.25V4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
