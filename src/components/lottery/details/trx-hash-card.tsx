"use client";

import Ball from "@components/icon/xosotot/ball";
import LotteryDetailsCard from "@components/lottery/details/card";
import { LOTTERY_COLORS, LOTTERY_NUMBERS, LOTTERY_SIZES } from "@config/lottery";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

type LotteryTrxHashDetailsCardProps = {
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

export default function LotteryTrxHashDetailsCard(props: LotteryTrxHashDetailsCardProps) {
  const t = useTranslations();

  let color;
  let value = props.details.selecttype;
  let status = "pending";

  if (props.details.profit !== null) {
    status = props.details.profit > 0 ? "win" : "lost";
  }

  const number = LOTTERY_NUMBERS.find((item) => item.value === props.details.lottery?.result);
  const colors = LOTTERY_COLORS.filter((item) => number?.color.includes(item.value));
  const size = LOTTERY_SIZES.find(
    (item) => number && (parseInt(number.value) > 4 ? item.name === "Big" : item.name === "Small"),
  );

  if (!isNaN(parseInt(value))) {
    color = LOTTERY_NUMBERS.find((item) => item.value.toString() === value)!.color;

    //
  } else if (["B", "S"].includes(value)) {
    color = "yellow";

    //
  } else {
    color = value;
    value = "";
  }

  return (
    <LotteryDetailsCard details={props.details} key={props.details.id} status={status as never}>
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold leading-4">{t("Result")}</strong>
        {props.details.profit !== null && props.details.lottery?.result && (
          <div className="flex items-center gap-2.5">
            {colors.length > 0 && (
              <p className={twMerge("rounded", colors[0].text)}>{colors.map((item) => t(item.name)).join(", ")}</p>
            )}
            {size && <p className={twMerge("rounded", size.text)}>{t(size.name)}</p>}
            {number && (
              <Ball className="-my-1 text-lg" color={number.color as never} size={rem(24)}>
                {number.value}
              </Ball>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
        <strong className="font-bold">{t("Select")}</strong>
        <div className="flex items-center">
          <Ball className="-my-1 text-lg" color={color as never} size={rem(24)}>
            {value}
          </Ball>
        </div>
      </div>
    </LotteryDetailsCard>
  );
}
