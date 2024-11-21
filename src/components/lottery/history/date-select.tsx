"use client";

import ChevronDown from "@components/icon/custom/chevron-down";
import Wheel from "@components/lottery/history/wheel";
import LoaderDialog from "@components/shared/loader-dialog";
import { Portal, Transition } from "@headlessui/react";
import dayjs from "@lib/dayjs";
import { range, rem } from "@lib/utils";
import type { UnitType } from "dayjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useState, useTransition } from "react";

type DateSelectProps = {
  date?: string;
};

export default function DateSelect(props: DateSelectProps) {
  const t = useTranslations();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [date, setDate] = useState(() => dayjs.utc(props.date));

  const years = useMemo(
    () =>
      range(dayjs().year() - 9, dayjs().year()).map((year) => ({
        value: year,
        label: year.toString(),
      })),
    [],
  );

  const months = useMemo(
    () =>
      range(0, 11).map((month) => ({
        value: month,
        label: (month + 1).toString().padStart(2, "0"),
      })),
    [],
  );

  const days = useMemo(
    () =>
      range(1, date.daysInMonth()).map((day) => ({
        value: day,
        label: day.toString().padStart(2, "0"),
      })),
    [date],
  );

  useEffect(() => {
    setDate(dayjs.utc(props.date));
  }, [props.date]);

  return (
    <>
      <button
        className="flex w-0 grow items-center gap-2.5 rounded bg-red-50 p-2.5 text-xs font-bold leading-4"
        onClick={setShow.bind(0, true)}
        type="button"
      >
        {props.date || t("Choose a date")}

        <ChevronDown className="ml-auto rotate-180" size={rem(12)} />
      </button>

      <Portal>
        <Transition
          afterLeave={setDate.bind(0, dayjs.utc(props.date))}
          className="fixed inset-0 z-snackbar"
          show={show}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            leave="transition-opacity duration-300"
            leaveTo="opacity-0"
          >
            {/* eslint-disable-next-line -- - */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={setShow.bind(0, false)} />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-500"
            enterFrom="translate-y-full"
            leave="transition-transform duration-300"
            leaveTo="translate-y-full"
          >
            <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-blue-100 px-5 shadow-drawer pb-safe-or-3">
              <header className="-mx-3 mt-1 flex items-center justify-between gap-2.5 text-xs font-medium">
                <button className="p-3 text-gray-700" onClick={setShow.bind(0, false)} type="button">
                  {t("Cancel")}
                </button>
                <strong className="text-sm">{t("Choose a date")}</strong>
                <button
                  className="p-3 text-red-500"
                  onClick={onChange.bind(0, date.format("YYYY-MM-DD"))}
                  type="button"
                >
                  {t("Confirm")}
                </button>
              </header>

              <div className="flex font-inter text-sm">
                <Wheel className="grow" onChange={update("year")} value={date.year()} values={years} />
                <Wheel className="grow" onChange={update("month")} value={date.month()} values={months} />
                <Wheel className="grow" onChange={update("date")} value={date.date()} values={days} />
              </div>
            </div>
          </Transition.Child>
        </Transition>
      </Portal>

      <LoaderDialog show={isPending} />
    </>
  );

  function update(unit: UnitType) {
    return (value: number) => {
      setDate(date.clone().set(unit, value));
    };
  }

  function onChange(value?: string) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("date", value);
    } else {
      params.delete("date");
    }

    startTransition(() => {
      router.refresh();
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });

    setShow(false);
  }
}
