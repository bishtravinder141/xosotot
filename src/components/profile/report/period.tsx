"use client";

import LoaderDialog from "@components/shared/loader-dialog";
import { Portal } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

const filters = {
  today: "Today",
  yesterday: "Yesterday",
  seven_days: "Seven days",
  this_month: "This month",
  last_month: "Last month",
  last_week: "Last week",
};

type ReportPeriodProps = {
  period: string;
};

export default function ReportPeriod(props: ReportPeriodProps) {
  const t = useTranslations();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  const toggle = () => {
    setShow((state) => !state);
  };

  const change = (variant: string) => (event: MouseEvent<HTMLButtonElement>) => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("period") === variant) {
      return;
    }

    event.preventDefault();

    close();

    startTransition(() => {
      params.set("period", variant);

      router.refresh();
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <>
      <button className="flex w-full rounded-full bg-red-200 p-2.5" onClick={toggle} type="button">
        <strong className="m-auto text-xs text-white">{t("Filters")}</strong>
      </button>

      <Portal>
        <div
          className={twMerge(
            "fixed inset-x-0 bottom-0 z-drawer rounded-t-2xl bg-blue-100 pt-5 shadow-drawer transition-transform duration-700 pb-safe-or-5",
            !show && "translate-y-full",
          )}
        >
          <div className="container flex flex-col gap-2.5 px-5">
            {Object.keys(filters).map((variant) => (
              <button
                className={`flex rounded-full p-2.5 ring-1 ring-blue-500${props.period === variant ? " bg-white" : ""}`}
                key={variant}
                onClick={change(variant)}
                type="button"
              >
                <span className="m-auto text-xs">{t(filters[variant as keyof typeof filters])}</span>
              </button>
            ))}

            <button className="flex rounded-full bg-blue-500 p-2.5" onClick={close} type="button">
              <span className="m-auto text-xs text-white">{t("Cancel")}</span>
            </button>
          </div>
        </div>
      </Portal>

      <LoaderDialog show={isPending} />
    </>
  );
}
