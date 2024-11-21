"use client";

import X from "@components/icon/bootstrap/x";
import { LotteryBetTrigger, useLotteryBets } from "@components/primitive/lottery";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";

type VietnamLotteryBetProps = {
  visible?: boolean;
};

export default function VietnamLotteryBet(props: VietnamLotteryBetProps) {
  const t = useTranslations();

  const [bets] = useLotteryBets();

  return (
    <>
      <input name="bettype" type="hidden" value={bets[0]?.type.replaceAll(":", "")} />
      <input name="betcontent" type="hidden" value={bets.map((item) => item.value).join(",")} />

      {props.visible && (
        <div className="flex flex-wrap gap-1">
          <span className="text-xs font-bold leading-8">{t("Your pick")}</span>
          {bets.map((item) => (
            <LotteryBetTrigger
              className="relative rounded bg-red-200 bg-opacity-10 p-2.5 text-[0.625rem] font-bold leading-3 transition data-[state=active]:bg-opacity-100 data-[state=active]:text-white"
              key={item.value}
              type={item.type}
              value={item.value}
            >
              {item.value}

              <X className="absolute -right-1 -top-1 rounded-full bg-white text-red-300" size={rem(10)} />
            </LotteryBetTrigger>
          ))}
        </div>
      )}

      {props.visible && <hr />}
    </>
  );
}
