import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function ZalopayFill(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="none" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 200 200">
      <circle cx="100" cy="100" fill="white" r="98" stroke="#0068FF" strokeWidth="4" />
      <text
        fill="#0068FF"
        fontFamily="Arial, sans-serif"
        fontSize="48"
        fontWeight="bold"
        textAnchor="middle"
        x="100"
        y="90"
      >
        Zalo
      </text>
      <text
        fill="#00B14F"
        fontFamily="Arial, sans-serif"
        fontSize="42"
        fontWeight="bold"
        textAnchor="middle"
        x="100"
        y="140"
      >
        Pay
      </text>
    </svg>
  );
}
