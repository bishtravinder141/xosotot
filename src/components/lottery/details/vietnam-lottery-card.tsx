"use client";

import Ball from "@components/icon/xosotot/ball";
import LotteryDetailsCard from "@components/lottery/details/card";
import { LOTTERY_NUMBERS, LOTTERY_SIZES, LOTTERY_TYPES } from "@config/lottery";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";

type LotteryVietnamLotteryDetailsCardProps = {
  title?: string;
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
      city: {
        name: string;
      };
      region: {
        name: string;
      };
      result: string | null;
      updated_at: string;
    };
  };
};

export default function LotteryVietnamLotteryDetailsCard(props: LotteryVietnamLotteryDetailsCardProps) {
  const t = useTranslations();

  let status = "pending";

  if (props.details.profit !== null) {
    status = props.details.profit > 0 ? "win" : "lost";
  }

  const type = LOTTERY_TYPES.find((item) => item.value === props.details.selecttype);
  const size = LOTTERY_SIZES.find((item) => item.value === props.details.selecttype);

  let select = type?.k3 ?? size?.k3 ?? props.details.selecttype;
  select = `${select},${select},${select}`;

  return (
    <LotteryDetailsCard
      details={props.details as never}
      key={props.details.id}
      status={status as never}
      title={props.title}
    >
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold leading-4">{t("Region")}</strong>
        <span>{props.details.lottery?.region.name}</span>
      </div>

      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold leading-4">{t("City")}</strong>
        <span>{props.details.lottery?.city.name}</span>
      </div>

      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold">{t("Type")}</strong>
        <span>{["A", "B", "C", "D", "E", t("Total")][(props.details.gametype - 1) % 6]}</span>
      </div>

      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold leading-4">{t("Result")}</strong>
        {props.details.profit !== null && props.details.lottery?.result && (
          <div className="flex items-center gap-0.5">
            {props.details.lottery.result.split("").map((value, index) => (
              <Ball
                className="-my-0.5 text-2xl"
                color="gray"
                // eslint-disable-next-line react/no-array-index-key -- -
                key={props.details.lottery!.result! + index}
                size={rem(20)}
              >
                {value}
              </Ball>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold">{t("Select")}</strong>
        <div className="-my-3 flex w-0 grow items-center gap-1.5 overflow-x-auto">
          {select.split(",").map((value, i) => (
            // eslint-disable-next-line react/no-array-index-key -- -
            <div className="flex gap-0.5 rounded-md border border-red-300 bg-red-50 p-1" key={select + i}>
              {value.split("").map((item, j) => {
                const number = LOTTERY_NUMBERS.find((v) => v.value === item)!;

                return (
                  // eslint-disable-next-line react/no-array-index-key -- -
                  <Ball className="text-2xl" color={number.color as never} key={select + j} size={rem(18)}>
                    {number.value}
                  </Ball>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </LotteryDetailsCard>
  );
}
