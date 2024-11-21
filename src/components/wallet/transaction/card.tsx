"use client";

import Copy from "@components/icon/custom/copy";
import ClipboardTrigger from "@components/primitive/clipboard-trigger";
import dayjs from "@lib/dayjs";
import { format } from "@lib/format";
import { rem } from "@lib/utils";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

type WalletTransactionCardProps = {
  id: number;
  amount: number;
  status: string;
  message?: string | null;
  updated_at: string;
};

export default function WalletTransactionCard(props: WalletTransactionCardProps) {
  const t = useTranslations();

  const id = `${dayjs(props.updated_at).format("YYYYMMDD")}${props.id.toString()}`;
  const status = props.status === "Recharge Successful" ? "approved" : props.status;

  return (
    <div className="space-y-2.5 rounded-lg bg-white px-3 py-2 text-black">
      <div className={twMerge(styles({ status: status.toLowerCase() as never }))}>
        <div className="flex flex-col items-start gap-1">
          <span className="text-[0.625rem] font-bold leading-4">{t(props.status)}</span>

          <ClipboardTrigger className="flex gap-1.5 text-black" value={id}>
            <span className="text-[0.5rem] leading-3 tracking-wider">{id}</span>
            <Copy size={rem(12)} />
          </ClipboardTrigger>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-sm font-bold leading-4">
            {format(props.amount, {
              style: "currency",
            })}
          </span>
          <span className="text-[0.5rem] leading-3 text-black">{dayjs(props.updated_at).toDateTimeString()}</span>
        </div>
      </div>

      {["failed", "rejected"].includes(status.toLowerCase()) && props.message && (
        <div className="text-red-100">
          <strong className="text-[0.625rem]">{`${t("Rejection Reason")}:`}</strong>
          <p className="text-xs">{props.message}</p>
        </div>
      )}
    </div>
  );
}

const styles = cva("flex justify-between gap-3", {
  variants: {
    status: {
      failed: "text-christine-500",
      pending: "text-christine-500",
      rejected: "text-red-100",
      approved: "text-green-800",
      completed: "text-green-800",
    },
  },
});
