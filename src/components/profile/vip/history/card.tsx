"use client";

import dayjs from "@lib/dayjs";
import { useTranslations } from "next-intl";

type VipHistoryCardProps = {
  experience: number;
  updated_at: string;
};

export default function VipHistoryCard(props: VipHistoryCardProps) {
  const t = useTranslations();

  return (
    <div className="flex gap-3 rounded-lg bg-blue-100 px-4 py-3 text-center text-[0.625rem] leading-4">
      <div className="flex flex-col items-start">
        <strong>{t("Experience Bonus")}</strong>
        <span>{t("Betting EXP")}</span>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <strong className="text-blue-500">{`${props.experience.toLocaleString("en").replaceAll(",", " ")} EXP`}</strong>
        <span>{dayjs(props.updated_at).toDateTimeString()}</span>
      </div>
    </div>
  );
}
