"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type LotteryPeriodTabProps = PropsWithChildren<{
  name: string;
  only?: string[];
  value: string;
  active?: boolean;
}>;

export default function VietnamLotteryFilterTrigger(props: LotteryPeriodTabProps) {
  const router = useRouter();
  const [_bets, setBets] = useLotteryBets();

  return (
    <button
      className="flex shrink-0 grow items-center justify-between gap-2 rounded border border-white bg-white px-1.5 py-3"
      onClick={onClick}
      type="button"
    >
      <span className="text-[0.625rem] font-bold capitalize leading-3 text-red-300">{props.children}</span>

      <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
        <span
          className={twMerge("size-2.5 rounded-full bg-transparent transition-colors", props.active && "bg-red-300")}
        />
      </span>
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

    params.set(props.name, props.value);

    router.refresh();
    router.replace(`?${params.toString()}`, {
      scroll: false,
    });

    setBets([]);
  }
}
