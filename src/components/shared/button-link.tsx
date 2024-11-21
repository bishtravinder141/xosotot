import ChevronRight from "@components/icon/custom/chevron-right";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export default function ButtonLink(props: ComponentPropsWithoutRef<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      className={twMerge(
        "flex items-center gap-1.5 rounded-lg bg-blue-500 p-2.5 text-xs font-bold leading-5 text-white",
        props.className,
      )}
    >
      {props.children}
      <ChevronRight className="ml-auto size-5 shrink-0 rounded-full bg-white p-1.5 text-blue-500" size={rem(8)} />
    </NextLink>
  );
}
