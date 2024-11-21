"use client";

import confetti from "@assets/images/general/dialog-confetti.png";
import details from "@assets/images/lottery/lose-details.png";
import lose from "@assets/images/lottery/lose.png";
import LotteryBetResultPopup from "@components/lottery/bet/result-popup";
import { Dialog } from "@headlessui/react";
import dayjs from "@lib/dayjs";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import type { PropsWithChildren } from "react";

type LotteryBetLoseResultProps = PropsWithChildren<{
  id: number;
  prefix: string;
}>;

export default function LotteryBetLoseResult(props: LotteryBetLoseResultProps) {
  const t = useTranslations();

  return (
    <LotteryBetResultPopup id={`${props.prefix}#${props.id}`}>
      <div className="absolute -inset-x-5 -top-24 z-[1] -mt-2 overflow-hidden">
        <div className="-mx-5 -mt-3.5">
          <NextImage alt="Lose" priority src={lose} />
        </div>
      </div>

      <NextImage alt="Confetti" className="absolute inset-x-0 bottom-0" priority src={confetti} />

      <Dialog.Title className="text-center font-bold">{t("Sorry")}</Dialog.Title>

      <div className="relative mt-6 flex flex-col items-center">
        <p className="text-sm tracking-wide">{t("Lottery results")}</p>

        <div className="mt-3 flex flex-wrap gap-3 font-bold">{props.children}</div>
      </div>

      <div className="relative mt-6">
        <NextImage alt="" priority src={details} />

        <div className="absolute inset-x-6 top-6 text-center text-black">
          <p className="text-xl font-bold uppercase text-polo-blue-600">{t("Lose")}</p>
          <p className="mt-2 text-[0.625rem]">{`${t("Period")}: ${dayjs().format("YYYYMMDD")}${props.id}`}</p>
        </div>
      </div>
    </LotteryBetResultPopup>
  );
}
