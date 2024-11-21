import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function ArrowDown(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 8 9">
      <path
        clipRule="evenodd"
        d="M4.40829 8.59229C5.56257 7.42811 6.78046 6.36945 7.8593 5.13518C8.1812 4.76719 7.91454 4.19043 7.42578 4.19043H5.49209L5.23762 1.13865C5.1839 0.495233 4.646 0 3.99992 0C3.35383 0 2.81593 0.495233 2.76222 1.13865L2.50774 4.19043H0.574049C0.0852925 4.19043 -0.18099 4.76719 0.14053 5.13518C1.21938 6.36945 2.43727 7.42811 3.59154 8.59229C3.81554 8.81819 4.1843 8.81819 4.40829 8.59229Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
