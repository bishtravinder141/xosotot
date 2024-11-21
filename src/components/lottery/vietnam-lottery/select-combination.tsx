"use client";

import { useCombination } from "@components/primitive/combination";
import { useTranslations } from "next-intl";
import type { AllHTMLAttributes } from "react";

type VietnamLotterySelectCombinationProps = AllHTMLAttributes<HTMLSpanElement> & {
  size: number;
};

export default function VietnamLotterySelectCombination(props: VietnamLotterySelectCombinationProps) {
  const { size, ...attrs } = props;

  const t = useTranslations();
  const [combinations] = useCombination();

  return (
    <span {...attrs}>
      {`${t("Choose last {value} digits", { value: size })}: ${combinations
        .join("")
        .padStart(5 - size + combinations.length, "*")
        .padEnd(5, "*")}`}
    </span>
  );
}
