import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function Google(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg height={size ?? "1em"} width={size ?? "1em"} {...attrs} fill="none" viewBox="0 0 32 32">
      <defs>
        <path
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          id="A"
        />
      </defs>
      <clipPath id="B">
        <use xlinkHref="#A" />
      </clipPath>
      <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
        <path clipPath="url(#B)" d="M0 37V11l17 13z" fill="#fbbc05" />
        <path clipPath="url(#B)" d="M0 11l17 13 7-6.1L48 14V0H0z" fill="#ea4335" />
        <path clipPath="url(#B)" d="M0 37l30-23 7.9 1L48 0v48H0z" fill="#34a853" />
        <path clipPath="url(#B)" d="M48 48L17 24l-4-3 35-10z" fill="#4285f4" />
      </g>
    </svg>
  );
}
