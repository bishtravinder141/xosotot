import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

type IconProps = VariantProps<typeof styles> & {
  size?: number | string;
};

export default function Ball(props: SVGAttributes<SVGElement> & IconProps) {
  const { size, color, children, className, ...attrs } = props;
  const classes = twMerge(styles({ color }), className);

  return (
    <svg height={size ?? "3em"} width={size ?? "3em"} {...attrs} className={classes} fill="white" viewBox="0 0 48 48">
      <path d="M16.4174 1.22247C18.8008 0.429443 21.3502 0 24 0C26.8813 0 29.6442 0.507812 32.2037 1.43872C31.0444 4.65619 27.9648 6.95654 24.3479 6.95654C20.6504 6.95654 17.5143 4.55261 16.4174 1.22247Z" />
      <path d="M1.28357 31.764C0.451538 29.3287 0 26.7171 0 24C0 21.0445 0.53418 18.2138 1.51135 15.5992C5.05078 16.567 7.65222 19.8058 7.65222 23.6522C7.65222 27.5806 4.9386 30.8753 1.28357 31.764Z" />
      <path d="M32.4009 46.4886C29.7863 47.4658 26.9554 48 24 48C21.283 48 18.6713 47.5485 16.2361 46.7164C17.1248 43.0613 20.4194 40.3478 24.3479 40.3478C28.1942 40.3478 31.4331 42.9492 32.4009 46.4886Z" />
      <path d="M46.5613 15.7963C47.4922 18.3558 48 21.1187 48 24C48 26.6498 47.5707 29.1993 46.7776 31.5826C43.4474 30.4857 41.0435 27.3497 41.0435 23.6522C41.0435 20.0352 43.3438 16.9556 46.5613 15.7963Z" />
      <path d="M36.1739 24C36.1739 30.7234 30.7234 36.1739 24 36.1739C17.2765 36.1739 11.826 30.7234 11.826 24C11.826 17.2765 17.2765 11.826 24 11.826C30.7234 11.826 36.1739 17.2765 36.1739 24Z" />

      {typeof children !== "undefined" && (
        <text className="font-bold" dominantBaseline="middle" fill="black" textAnchor="middle" x="24" y="26">
          {children}
        </text>
      )}
    </svg>
  );
}

const styles = cva("rounded-full shadow-inner", {
  variants: {
    color: {
      red: "from-red-600 via-red-300 via-65% to-red-600 bg-radial-gradient-center",
      gray: "from-gray-800 via-gray-200 via-65% to-white bg-radial-gradient-center",
      green: "from-green-800 via-green-600 via-65% to-green-800 bg-radial-gradient-center",
      black: "from-gray-800 via-gray-500 via-65% to-gray-800 bg-radial-gradient-center",
      yellow: "from-yellow-700 via-yellow-300 via-65% to-yellow-700 bg-radial-gradient-center",
      violet: "from-violet-500 via-violet-300 via-65% to-violet-500 bg-radial-gradient-center",
      "red-violet": "to-custom-violet bg-gradient-to-br from-red-700 via-red-300 via-50% to-50%",
      "green-violet": "to-custom-violet bg-gradient-to-br from-green-800 via-green-600 via-50% to-50%",
    },
  },
  defaultVariants: {
    color: "black",
  },
});
