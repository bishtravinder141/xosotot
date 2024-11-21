"use client";

import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type LotteryPeriodTabProps = PropsWithChildren<{
  name: string;
  only?: string[];
  value?: string;
  active?: boolean;
}>;

export default function QueryTab(props: LotteryPeriodTabProps) {
  const router = useRouter();

  return (
    <button
      className={twMerge(
        "flex-1 rounded bg-red-50 p-2.5 text-[0.625rem] font-bold leading-3",
        props.active && "bg-red-300 text-white",
      )}
      onClick={onClick}
      type="button"
    >
      {props.children}
    </button>
  );

  function onClick() {
    const params = new URLSearchParams(window.location.search);

    if (props.only) {
      for (const key of params.keys() as never as string[]) {
        if (!props.only.includes(key)) {
          params.delete(key);
        }
      }
    }

    if (props.value) {
      params.set(props.name, props.value);
    } else {
      params.delete(props.name);
    }

    router.refresh();
    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  }
}
