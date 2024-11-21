import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function TransactionsOutline(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg height={size ?? "1em"} width={size ?? "1em"} {...attrs} fill="none" viewBox="3 3 17 17">
      <path
        d="M5.5 8.5C6.05228 8.5 6.5 8.05228 6.5 7.5C6.5 6.94772 6.05228 6.5 5.5 6.5C4.94772 6.5 4.5 6.94772 4.5 7.5C4.5 8.05228 4.94772 8.5 5.5 8.5Z"
        stroke="currentColor"
      />
      <path d="M8.5 6.5H19.5M8.5 8.5H14.5" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M5.5 13C6.05228 13 6.5 12.5523 6.5 12C6.5 11.4477 6.05228 11 5.5 11C4.94772 11 4.5 11.4477 4.5 12C4.5 12.5523 4.94772 13 5.5 13Z"
        stroke="currentColor"
      />
      <path d="M8.5 11H16.5M8.5 13H15.5" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M5.5 17.5C6.05228 17.5 6.5 17.0523 6.5 16.5C6.5 15.9477 6.05228 15.5 5.5 15.5C4.94772 15.5 4.5 15.9477 4.5 16.5C4.5 17.0523 4.94772 17.5 5.5 17.5Z"
        stroke="currentColor"
      />
      <path d="M8.5 15.5H18M8.5 17.5H12.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
