"use client";

import balls from "@assets/images/lottery/overlay-balls.png";
import { useNow } from "@components/primitive/time";
import useLocalStorage from "@hooks/local-storage";
import { getLotteryExpired } from "@lib/lottery";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
// @ts-expect-error -- -
import { useSound } from "use-sound";

type LotteryTimerOverlayProps = {
  hours?: boolean;
  className?: string;
} & (
  | {
      locked?: number;
      period?: never;
      expired: number;
    }
  | {
      locked?: never;
      period: number;
      expired?: never;
    }
);

export default function LotteryTimerOverlay(props: LotteryTimerOverlayProps) {
  const t = useTranslations();
  const time = useNow({ interval: 1000 }).getTime();
  const [volume] = useLocalStorage("volume", {
    decoder(data) {
      return parseFloat(data ?? "1");
    },
  });
  const [playSound1] = useSound("/sounds/di1.mp3", { volume });
  const [playSound2] = useSound("/sounds/di2.mp3", { volume });

  const expired = props.expired ?? getLotteryExpired(time, props.period);
  const seconds = Math.max(Math.ceil((expired - time) / 1000) - 1, 0);
  const locked = props.locked ?? expired - 5_000;

  useEffect(() => {
    if (seconds < 1) {
      playSound2();
    } else if (seconds < 5) {
      playSound1();
    }
  }, [volume, seconds, playSound1, playSound2]);

  return (
    <div
      className={twMerge(
        "absolute inset-0 flex flex-col items-center justify-center rounded-md bg-red-300/80 backdrop-blur-sm transition-opacity",
        locked - time > 0 && "pointer-events-none opacity-0",
        props.className,
      )}
    >
      <NextImage alt="Balls" className="absolute inset-x-0 bottom-0 h-auto w-full" src={balls} />
      <div className={twMerge("flex gap-1.5 text-5xl text-red-300", props.className)}>
        {props.hours && (
          <>
            <span className="inline-flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-white font-bold">
              {Math.floor(seconds / 600) % 6}
            </span>
            <span className="inline-flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-white font-bold">
              {Math.floor(seconds / 60) % 10}
            </span>
            <span className="inline-flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-white font-bold">
              :
            </span>
          </>
        )}
        <span className="inline-flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-white font-bold">
          {Math.floor(seconds / 10) % 6}
        </span>
        <span className="inline-flex h-20 w-14 shrink-0 items-center justify-center rounded-md bg-white font-bold">
          {seconds % 10}
        </span>
      </div>

      <p className="mb-3 mt-5 w-7/12 text-center font-bold text-white">
        {t("The game has started wait for the results")}
      </p>
    </div>
  );
}
