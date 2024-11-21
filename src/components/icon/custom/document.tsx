import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function Document(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 9 11">
      <path
        clipRule="evenodd"
        d="M6.15788 5.0263H2.3684C2.10693 5.0263 1.89472 4.81409 1.89472 4.55261C1.89472 4.29114 2.10693 4.07893 2.3684 4.07893H6.15788C6.41935 4.07893 6.63156 4.29114 6.63156 4.55261C6.63156 4.81409 6.41935 5.0263 6.15788 5.0263ZM4.85525 6.92106H2.3684C2.10693 6.92106 1.89472 6.70885 1.89472 6.44737C1.89472 6.1859 2.10693 5.97369 2.3684 5.97369H4.85525C5.11672 5.97369 5.32893 6.1859 5.32893 6.44737C5.32893 6.70885 5.11672 6.92106 4.85525 6.92106ZM8.91332 1.91754C8.89674 1.53717 8.58079 1.23686 8.19995 1.23686H7.10526V1.00002C7.10526 0.607806 6.78695 0.28949 6.39474 0.28949C6.00253 0.28949 5.68421 0.607806 5.68421 1.00002V1.23686H3.31579V1.00002C3.31579 0.607806 2.99747 0.28949 2.60526 0.28949C2.21305 0.28949 1.89474 0.607806 1.89474 1.00002V1.23686H0.800053C0.419211 1.23686 0.103263 1.53717 0.0866842 1.91754C-0.0288947 4.62038 -0.0288947 7.32702 0.0866842 10.0299C0.103263 10.4102 0.419211 10.7105 0.800053 10.7105H8.19995C8.58079 10.7105 8.89674 10.4102 8.91332 10.0299C9.02889 7.32702 9.02889 4.62038 8.91332 1.91754Z"
        fillRule="evenodd"
      />
    </svg>
  );
}