"use client";

import DangerAlert from "@components/alert/danger";
import SuccessAlert from "@components/alert/success";
import Form from "@components/form/form";
import Check from "@components/icon/custom/check";
import LotteryPresale from "@components/lottery/presale";
import {
  LotteryAmountTrigger,
  LotteryCountTrigger,
  useLotteryAmount,
  useLotteryBets,
  useLotteryCount,
} from "@components/primitive/lottery";
import SubmitButton from "@components/shared/submit-button";
import { LOTTERY_AMOUNTS, LOTTERY_COUNTS } from "@config/lottery";
import { Portal, Transition } from "@headlessui/react";
import { format } from "@lib/format";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { twMerge } from 'tailwind-merge';

type LotteryBetDrawerProps = PropsWithChildren<{
  action: (data: FormData) => Promise<{ message: string } | { error?: string | undefined } | undefined>;
}>;

export default function LotteryBetDrawer(props: LotteryBetDrawerProps) {
  const t = useTranslations();
  const [bets, setBets] = useLotteryBets();
  const [count] = useLotteryCount();
  const [amount, setAmount] = useLotteryAmount();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (bets.length > 0) {
      setPrice(amount * count * bets.length);
    }
  }, [amount, count, bets.length]);

  return (
    <Portal>
      <Transition as={Fragment} enterFrom="translate-y-full" leaveTo="translate-y-full" show={bets.length > 0}>
        <div className="fixed inset-x-0 bottom-0 z-drawer rounded-t-2xl bg-blue-100 pt-5 shadow-drawer transition-transform duration-700 pb-safe-or-5">
          <Form action={submit as never} className="container flex flex-col gap-2.5 px-5 [&_hr]:border-blue-500">
            <input name="betcount" type="hidden" value={count} />
            <input name="amount" type="hidden" value={amount} />

            <div className="flex max-h-36 flex-col gap-2.5 overflow-y-auto">
              {props.children}

              <div className="flex flex-wrap gap-2.5">
                <span className="text-xs font-bold leading-8">{t("Price")}</span>
                {LOTTERY_AMOUNTS.map((value) => (
                  <LotteryAmountTrigger
                    className={twMerge(
                      "rounded p-2.5 text-[0.625rem] font-bold leading-3 transition",
                      price === value && LOTTERY_AMOUNTS.includes(price)
                        ? "bg-red-200 bg-opacity-100 text-white"
                        : "bg-red-200 bg-opacity-10"
                    )}
                    key={value}
                    onClick={() => {
                      setAmount(value);
                    }}
                    value={value}
                  >
                    {format(value, {
                      style: "decimal",
                      fractionDigits: 0,
                    })}
                  </LotteryAmountTrigger>
                ))}
              </div>
                <input
                  className="mt-2 rounded-md bg-white p-2"
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    if (isNaN(value)) {
                      setAmount(0);
                    } else {
                      setAmount(value);
                    }
                  }}
                  type="number"
                  value={price}
                />          
              <hr />
              <div className="flex flex-wrap gap-1">
                <span className="text-xs font-bold leading-8">{t("Number")}</span>
                {LOTTERY_COUNTS.map((value) => (
                  <LotteryCountTrigger
                    className="rounded bg-red-200 bg-opacity-10 p-2.5 text-[0.625rem] font-bold leading-3 transition data-[state=active]:bg-opacity-100 data-[state=active]:text-white"
                    key={value}
                    value={value}
                  >
                    {`X${value}`}
                  </LotteryCountTrigger>
                ))}
              </div>
            </div>

            <hr />

            <label className="flex items-center gap-3">
              <div className="relative inline-flex size-4">
                <input className="peer h-full w-full" defaultChecked name="agree" required type="radio" />
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-white text-white ring-1 ring-gray-200 transition-colors peer-checked:bg-red-300 peer-checked:ring-red-300">
                  <Check size={rem(10)} />
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {`${t("I agree")} `}
                <LotteryPresale />
              </p>
            </label>

            <div className="flex gap-3">
              <button
                className="group flex w-4/12 items-center justify-center rounded-md from-yellow-800 from-15% to-yellow-400 to-80% px-3 py-5 text-sm font-bold text-white bg-gradient-[177]"
                onClick={close}
                type="button"
              >
                {t("Back")}
              </button>
              <SubmitButton className="group flex w-8/12 items-center justify-center rounded-md from-blue-700 from-15% to-blue-300 to-80% px-3 py-5 text-sm font-bold text-white bg-gradient-[177]">
                {t("Accept")}
              </SubmitButton>
            </div>
          </Form>
        </div>
      </Transition>
    </Portal>
  );

  function close() {
    setBets([]);
  }

  async function submit(data: FormData) {
    if (!(data.has("gametype") || data.has("bettype")) || !(data.has("selecttype") || data.has("betcontent"))) {
      return;
    }

    const amountValue = Number(data.get("amount"));
    if (amountValue === 0) {
      toast.custom((id) => <DangerAlert id={id} title={t("Please fill the amount")} />);
      return;
    }

    if (amountValue < 1000) {
      toast.custom((id) => <DangerAlert id={id} title={t("The amount must be at least 1000")} />);
      return;
    }

    try {
      const response = await props.action(data);

      if (response && "error" in response) {
        toast.custom((id) => <DangerAlert id={id} title={response.error ?? t("Something went wrong")} />);
        return;
      }

      if (response && "message" in response) {
        toast.custom((id) => <SuccessAlert id={id} title={response.message} />);
      }

      close();
    } catch (error) {
      toast.custom((id) => <DangerAlert id={id} title={t("Something went wrong")} />);
    }
  }
}
