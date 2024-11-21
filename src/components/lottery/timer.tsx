"use client";

import { useNow } from "@components/primitive/time";
import { getLotteryExpired } from "@lib/lottery";
import { twMerge } from "tailwind-merge";

type LotteryTimerProps = {
  hours?: boolean;
  className?: string;
} & (
  | {
      period?: never;
      expired: number;
    }
  | {
      period: number;
      expired?: never;
    }
);

export default function LotteryTimer(props: LotteryTimerProps) {
  const time = useNow({ interval: 1000 }).getTime();

  const expired = props.expired ?? getLotteryExpired(time, props.period);
  const seconds = Math.max(Math.ceil((expired - time) / 1000) - 1, 0);

  return (
    <div className={twMerge("flex gap-1 text-4xl text-red-300", props.className)}>
      {props.hours && (
        <>
          <span className="inline-flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-white font-bold">
            {Math.floor(seconds / 36000) % 6}
          </span>
          <span className="inline-flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-white font-bold">
            {Math.floor(seconds / 3600) % 10}
          </span>
          <span className="inline-flex h-12 w-8 shrink-0 items-start justify-center rounded-md bg-white py-0.5 font-bold">
            :
          </span>
        </>
      )}
      <span className="inline-flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-white font-bold">
        {Math.floor(seconds / 600) % 6}
      </span>
      <span className="inline-flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-white font-bold">
        {Math.floor(seconds / 60) % 10}
      </span>
      <span className="inline-flex h-12 w-8 shrink-0 items-start justify-center rounded-md bg-white py-0.5 font-bold">
        :
      </span>
      <span className="inline-flex h-12 w-8 shrink-0 items-center justify-center rounded-md bg-white font-bold">
        {Math.floor(seconds / 10) % 6}
      </span>
      <span className="inline-flex h-12 w-9 shrink-0 items-center justify-center rounded-md bg-white font-bold">
        {seconds % 10}
      </span>
    </div>
  );
}
