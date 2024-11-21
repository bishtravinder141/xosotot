"use client";

import ChevronLeft from "@components/icon/custom/chevron-left";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { HTMLAttributes, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type TopAppbarBackProps = Omit<HTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export default function TopAppbarBack(props: TopAppbarBackProps) {
  const router = useRouter();

  return (
    <NextLink {...props} className={twMerge("size-9 rounded-full bg-white", props.className)} onClick={onClick}>
      <ChevronLeft className="m-3.5 size-2 text-red-200" />
    </NextLink>
  );

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (window.history.length > 2) {
      event.stopPropagation();
      event.preventDefault();
      router.back();
    }
  }
}
