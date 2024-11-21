"use client";

import Ball from "@components/icon/xosotot/ball";
import LotteryDetailsCard from "@components/lottery/details/card";
import { LOTTERY_NUMBERS, LOTTERY_SIZES, LOTTERY_TYPES } from "@config/lottery";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";

type Lottery5DLotreDetailsCardProps = {
  details: {
    id: number;
    amount: number;
    profit: number | null;
    betcount: number;
    gametype: number;
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

export default function Lottery5DLotreDetailsCard(props: Lottery5DLotreDetailsCardProps) {
  const t = useTranslations();

  let status = "pending";

  if (props.details.profit !== null) {
    status = props.details.profit > 0 ? "win" : "lost";
  }

  const type = LOTTERY_TYPES.find((item) => item.value === props.details.selecttype);
  const size = LOTTERY_SIZES.find((item) => item.value === props.details.selecttype);

  const select = type?.k3 ?? size?.k3 ?? props.details.selecttype;

  return (
    <LotteryDetailsCard details={props.details as never} key={props.details.id} status={status as never}>
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold">{t("Type")}</strong>
        <span>{["A", "B", "C", "D", "E", t("Total")][(props.details.gametype - 1) % 6]}</span>
      </div>

      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold leading-4">{t("Result")}</strong>
        {props.details.profit !== null && props.details.lottery?.result && (
          <div className="flex items-center gap-0.5">
            {props.details.lottery.result.split("").map((value, index) => (
              // eslint-disable-next-line react/no-array-index-key -- -
              <Ball className="-my-1 text-lg" color="gray" key={props.details.lottery!.result! + index} size={rem(24)}>
                {value}
              </Ball>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold">{t("Select")}</strong>
        <div className="flex items-center gap-0.5">
          {LOTTERY_NUMBERS.map((number) => (
            <Ball
              className="text-2xl"
              color={(select.includes(number.value.toString()) ? number.color : "gray") as never}
              key={number.value}
              size={rem(16)}
            >
              {number.value}
            </Ball>
          ))}
        </div>
      </div>
    </LotteryDetailsCard>
  );
}
