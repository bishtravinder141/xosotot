import type { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  size?: number | string;
};

export default function QuestionFill(props: IconProps) {
  const { size, ...attrs } = props;

  return (
    <svg fill="currentColor" height={size ?? "1em"} width={size ?? "1em"} {...attrs} viewBox="0 0 16 16">
      <path d="M7.99967 1.33333C11.6817 1.33333 14.6663 4.31799 14.6663 7.99999C14.6663 11.682 11.6817 14.6667 7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 7.99999C1.33301 4.31799 4.31767 1.33333 7.99967 1.33333ZM7.99967 10.6667C7.82286 10.6667 7.65329 10.7369 7.52827 10.8619C7.40325 10.9869 7.33301 11.1565 7.33301 11.3333C7.33301 11.5101 7.40325 11.6797 7.52827 11.8047C7.65329 11.9298 7.82286 12 7.99967 12C8.17649 12 8.34605 11.9298 8.47108 11.8047C8.5961 11.6797 8.66634 11.5101 8.66634 11.3333C8.66634 11.1565 8.5961 10.9869 8.47108 10.8619C8.34605 10.7369 8.17649 10.6667 7.99967 10.6667ZM7.99967 4.33333C7.35873 4.33333 6.74405 4.58794 6.29083 5.04115C5.83762 5.49437 5.58301 6.10905 5.58301 6.74999C5.58301 6.92681 5.65325 7.09637 5.77827 7.2214C5.90329 7.34642 6.07286 7.41666 6.24967 7.41666C6.42649 7.41666 6.59605 7.34642 6.72108 7.2214C6.8461 7.09637 6.91634 6.92681 6.91634 6.74999C6.91656 6.55335 6.9703 6.36048 7.0718 6.19205C7.17329 6.02363 7.31872 5.88601 7.49248 5.79394C7.66624 5.70188 7.86178 5.65884 8.05813 5.66946C8.25449 5.68007 8.44425 5.74392 8.60708 5.85418C8.76991 5.96443 8.89965 6.11693 8.98241 6.29531C9.06516 6.47369 9.0978 6.67123 9.07683 6.86675C9.05585 7.06227 8.98206 7.2484 8.86335 7.40517C8.74465 7.56194 8.58551 7.68345 8.40301 7.75666C7.95234 7.93666 7.33301 8.39799 7.33301 9.16666V9.33333C7.33301 9.51014 7.40325 9.67971 7.52827 9.80473C7.65329 9.92976 7.82286 9.99999 7.99967 9.99999C8.17649 9.99999 8.34605 9.92976 8.47108 9.80473C8.5961 9.67971 8.66634 9.51014 8.66634 9.33333C8.66634 9.17066 8.69967 9.08933 8.84034 9.01999L8.89834 8.99333C9.41888 8.78392 9.85037 8.39996 10.1188 7.90727C10.3873 7.41458 10.476 6.84385 10.3698 6.29292C10.2635 5.74199 9.96893 5.24517 9.5365 4.88764C9.10408 4.53011 8.56076 4.33414 7.99967 4.33333Z" />
    </svg>
  );
}
