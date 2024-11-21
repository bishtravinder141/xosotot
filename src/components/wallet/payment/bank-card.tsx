"use client";

import { select } from "@action/payment/bank";
import Card from "@components/icon/ion/card";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import type { ChangeEvent } from "react";
import { useOptimistic, useTransition } from "react";

type BankCardProps = {
  id: number;
  bank: string;
  holder: string;
  account: string;
  selected?: boolean;
};

export default function BankCard(props: BankCardProps) {
  const t = useTranslations();

  const [selected, setSelected] = useOptimistic(props.selected ?? false);
  const [_isPending, startTransition] = useTransition();

  return (
    <div className="overflow-hidden rounded-md bg-red-50">
      <header className="flex gap-2.5 bg-red-300 p-2.5 text-white">
        <Card size={rem(20)} />
        <strong className="truncate text-sm">{props.bank}</strong>
      </header>

      <div className="flex flex-col px-2.5 py-5">
        <strong className="text-lg">{props.account}</strong>
        <span className="text-sm font-medium text-gray-600">{props.holder}</span>
      </div>

      <footer className="border-t border-red-100/15 p-2.5">
        <label className="flex cursor-pointer select-none gap-2.5">
          <input checked={selected} className="peer hidden" onChange={onChange} type="checkbox" />

          <span className="inline-flex rounded-full p-0.5 text-transparent ring-1 ring-red-300 peer-checked:text-red-300">
            <span className="m-px size-2.5 rounded-full bg-current transition-colors" />
          </span>

          <span className="text-xs font-medium">{t("Select")}</span>
        </label>
      </footer>
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      setSelected(event.target.checked);

      const data = new FormData();

      if (event.target.checked) {
        data.set("id", props.id.toString());
      }

      await select(data);
    });
  }
}
