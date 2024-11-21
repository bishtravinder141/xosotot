"use client";

import LoaderDialog from "@components/shared/loader-dialog";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { HTMLAttributes, MouseEventHandler } from "react";
import { useTransition } from "react";
import { twMerge } from "tailwind-merge";

type BottomAppBarLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  as?: string;
  href: string;
  label: string;
};

export default function BottomAppBarLink(props: BottomAppBarLinkProps) {
  const { href, as = href, label, children, className, ...attrs } = props;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const isActive = pathname === as || (href !== "/" && pathname.startsWith(`${href}/`));

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    startTransition(() => {
      event.preventDefault();

      router.push(as);
    });
  };

  return (
    <>
      <NextLink
        {...attrs}
        className={twMerge("flex w-0 grow flex-col items-center", className)}
        href={as}
        onClick={onClick}
      >
        {children}

        <span className="flex h-6 flex-col items-center gap-0.5 overflow-hidden text-[0.625rem]">
          <span className={twMerge("transition-[margin]", !isActive && "mt-2.5")}>{label}</span>
          <span className="size-1.5 rounded-full bg-white" />
        </span>
      </NextLink>

      <LoaderDialog show={isPending} />
    </>
  );
}
