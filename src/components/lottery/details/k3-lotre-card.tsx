"use client";

import LotteryDetailsCard from "@components/lottery/details/card";
import LotteryDice from "@components/lottery/k3/dice";
import { useTranslations } from "next-intl";

type LotteryK3LotreDetailsCardProps = {
  details: {
    id: number;
    amount: number;
    profit: number | null;
    betcount: number;
    selecttype: string;
    created_at: string;
    updated_at: string;
    lottery: null | {
      id: number;
      result: string | null;
      updated_at: string;
    };
  };
};

export default function LotteryK3LotreDetailsCard(props: LotteryK3LotreDetailsCardProps) {
  const t = useTranslations();

  let status = "pending";

  if (props.details.profit !== null) {
    status = props.details.profit > 0 ? "win" : "lost";
  }

  return (
    <LotteryDetailsCard details={props.details} key={props.details.id} status={status as never}>
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold leading-4">{t("Result")}</strong>
        {props.details.profit !== null && props.details.lottery?.result && (
          <div className="flex items-center gap-0.5">
            {props.details.lottery.result.split("").map((value, index, list) => (
              <LotteryDice
                className="-my-1.5 size-7 shrink-0"
                // eslint-disable-next-line react/no-array-index-key -- -
                key={props.details.id + index}
                offset={parseInt(list[(index + 1) % list.length])}
                size={7}
                value={parseInt(value)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold">{t("Select")}</strong>
        <p>{props.details.selecttype}</p>
      </div>
    </LotteryDetailsCard>
  );
}
