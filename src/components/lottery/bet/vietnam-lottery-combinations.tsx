"use client";

import X from "@components/icon/bootstrap/x";
import { LotteryBetTrigger, useLotteryBets } from "@components/primitive/lottery";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";

export default function VietnamLotteryBetCombinations() {
  const t = useTranslations();

  const [bets] = useLotteryBets();

  return (
    <div className="flex gap-2.5 overflow-x-auto">
      {bets.length < 1 && (
        <p className="inline-flex size-12 shrink-0 items-center justify-center rounded-md bg-red-300 text-[0.5rem] text-white">
          {t("have’t")}
        </p>
      )}

      {bets.map((item) => (
        <LotteryBetTrigger
          className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-md bg-red-300 text-[0.5rem] text-white"
          key={item.value}
          type={item.type}
          value={item.value}
        >
          {item.value}

          <X className="absolute -right-1 -top-1 rounded-full bg-white text-red-300" size={rem(10)} />
        </LotteryBetTrigger>
      ))}
    </div>
  );
}
