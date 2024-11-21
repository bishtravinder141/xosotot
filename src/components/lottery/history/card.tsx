"use client";

import Copy from "@components/icon/custom/copy";
import ClipboardTrigger from "@components/primitive/clipboard-trigger";
import dayjs from "@lib/dayjs";
import { format } from "@lib/format";
import { rem } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";

type LotteryHistoryCardProps = VariantProps<typeof styles> & {
  id: number;
  type: string;
  amount: number | null;
  updated_at: string;
};

export default function LotteryHistoryCard(props: LotteryHistoryCardProps) {
  const t = useTranslations();

  const id = `${dayjs(props.updated_at).format("YYYYMMDD")}${props.id.toString()}`;
  let status = "pending";

  if (props.amount !== null) {
    status = props.amount > 0 ? "win" : "lost";
  }

  return (
    <div className={styles({ status: status as never })}>
      <div className="flex flex-col items-start">
        <ClipboardTrigger className="flex gap-1.5" value={id}>
          <span className="tracking-wider">{id}</span>
          <Copy className="my-0.5" size={rem(12)} />
        </ClipboardTrigger>
        <strong className="text-xs">{t(props.type)}</strong>
      </div>

      <div className="ml-auto flex flex-col items-end">
        <span className="text-sm font-bold leading-4">
          {props.amount
            ? format(props.amount, {
                style: "currency",
                signDisplay: "always",
              })
            : t("Pending")}
        </span>
        <span className="text-[0.5rem]">{dayjs(props.updated_at).toDateTimeString()}</span>
      </div>
    </div>
  );
}

const styles = cva(
  "flex gap-3 rounded-lg bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white",
  {
    variants: {
      status: {
        win: "bg-green-800",
        lost: "bg-red-100",
        pending: "bg-blue-500",
      },
    },
  },
);
