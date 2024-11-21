"use client";

import confetti from "@assets/images/general/dialog-confetti.png";
import details from "@assets/images/lottery/win-details.png";
import win from "@assets/images/lottery/win.png";
import LotteryBetResultPopup from "@components/lottery/bet/result-popup";
import { Dialog } from "@headlessui/react";
import dayjs from "@lib/dayjs";
import { format } from "@lib/format";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import type { PropsWithChildren } from "react";

type LotteryBetWinResultProps = PropsWithChildren<{
  id: number;
  amount: number | null;
  prefix: string;
}>;

export default function LotteryBetWinResult(props: LotteryBetWinResultProps) {
  const t = useTranslations();

  return (
    <LotteryBetResultPopup id={`${props.prefix}#${props.id}`}>
      <div className="absolute -inset-x-5 -top-24 z-[1] -mt-2">
        <NextImage alt="Win" priority src={win} />
      </div>
      <NextImage alt="Confetti" className="absolute inset-x-0 bottom-0" priority src={confetti} />

      <Dialog.Title className="text-center font-bold">{t("Congratulations")}</Dialog.Title>

      <div className="relative mt-6 flex flex-col items-center">
        <p className="text-sm tracking-wide">{t("Lottery results")}</p>

        <div className="mt-3 flex flex-wrap gap-3 font-bold">{props.children}</div>
      </div>

      <div className="relative mt-6">
        <NextImage alt="Details" priority src={details} />

        <div className="absolute inset-x-6 top-6 text-center text-black">
          <p className="text-xs font-bold text-red-200">{t("Bonus")}</p>
          <p className="text-sm font-bold text-red-200">
            {t("Got {value}", {
              value: format(props.amount, {
                style: "currency",
              }),
            })}
          </p>
          <p className="mt-2 text-[0.625rem]">{`${t("Period")}: ${dayjs().format("YYYYMMDD")}${props.id}`}</p>
        </div>
      </div>
    </LotteryBetResultPopup>
  );
}
