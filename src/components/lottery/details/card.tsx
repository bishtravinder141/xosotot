"use client";

import EyeFill from "@components/icon/bootstrap/eye-fill";
import Copy from "@components/icon/custom/copy";
import XCircle from "@components/icon/custom/x-circle";
import World from "@components/icon/fluent-mdl2/world";
import { Accordion, AccordionContent, AccordionTrigger } from "@components/primitive/accordion";
import ClipboardTrigger from "@components/primitive/clipboard-trigger";
import { TRANSACTION_COMMISSION } from "@config/transaction";
import { Dialog, Transition } from "@headlessui/react";
import dayjs from "@lib/dayjs";
import { format } from "@lib/format";
import { rem } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useLocale, useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { Fragment, useState } from "react";

type LotteryDetailsCardProps = VariantProps<typeof card> &
  PropsWithChildren<{
    title?: string;
    details: {
      id: number;
      amount: number;
      profit: number | null;
      betcount: number;
      created_at: string;
      updated_at: string;
      lottery: null | {
        id: number;
        ranks?: Record<"special_prize" | `result_${number}`, number[]>;
        updated_at: string;
      };
    };
  }>;

export default function LotteryDetailsCard(props: LotteryDetailsCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [show, setShow] = useState(false);

  const id = `${dayjs(props.details.lottery?.updated_at).format("YYYYMMDD")}${props.details.lottery?.id.toString()}`;

  const getResultTitle = (rank: string): string => {
    switch (rank) {
      case "special_prize":
        return t("Special Prize");
      case "result_1":
        return t("First Place");
      case "result_2":
        return t("Second Place");
      case "result_3":
        return t("Third Place");
      case "result_4":
        return t("Fourth Place");
      case "result_5":
        return t("Fifth Place");
      case "result_6":
        return t("Sixth Place");
      case "result_7":
        return t("Seventh Place");
      case "result_8":
        return t("Eighth Place");
      default:
        return rank;
    }
  };

  return (
    <>
      <Accordion className="overflow-hidden rounded-lg">
        <div className={card({ status: props.status })}>
          <div className="flex flex-col items-start">
            <ClipboardTrigger className="flex gap-1.5" value={id}>
              <span className="tracking-wider">{id}</span>
              <Copy className="my-0.5" size={rem(12)} />
            </ClipboardTrigger>
            <span className="text-[0.5rem]">{dayjs(props.details.updated_at).toDateTimeString()}</span>
          </div>

          <span className="ml-auto self-center text-sm font-bold">
            {props.details.profit
              ? format(props.details.profit, {
                  style: "currency",
                  signDisplay: "always",
                })
              : t("Pending")}
          </span>

          <AccordionTrigger className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-white p-2.5">
            <div className="-mt-4 pt-2.5 text-red-300">
              <EyeFill className="-mb-2.5" size={rem(16)} />
            </div>
          </AccordionTrigger>
        </div>

        <AccordionContent className="space-y-4 bg-blue-50">
          <div className="mt-4 flex gap-2.5 px-4">
            <strong className="mr-auto text-sm">{t("Details")}</strong>

            {props.details.lottery?.ranks && (
              <button
                className="-my-1 rounded-lg bg-blue-500 px-2 py-1.5 text-[0.625rem] font-medium text-white"
                onClick={setShow.bind(0, true)}
                type="button"
              >
                {t("Result table")}
              </button>
            )}
          </div>

          <div className="space-y-2.5 p-4 pt-0">
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Order number")}</strong>
              <span>{`${dayjs(props.details.created_at).format("YYYYMMDD")}${props.details.id.toString()}`}</span>
            </div>
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Period")}</strong>
              <span>{id}</span>
            </div>
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Purchase amount")}</strong>
              <span>
                {format(props.details.amount, {
                  style: "currency",
                })}
              </span>
            </div>
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Quantity")}</strong>
              <span>{props.details.betcount}</span>
            </div>
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Amount after tax")}</strong>
              <span>
                {format(props.details.amount * (1 - TRANSACTION_COMMISSION), {
                  style: "currency",
                })}
              </span>
            </div>
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Tax")}</strong>
              <span>
                {format(props.details.amount * TRANSACTION_COMMISSION, {
                  style: "currency",
                })}
              </span>
            </div>
            {props.children}
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">Win/Lose</strong>
              <span className={profit({ status: props.status })}>
                {props.details.profit &&
                  format(props.details.profit, {
                    style: "currency",
                    signDisplay: "always",
                  })}
              </span>
            </div>
            <div className="flex justify-between gap-2.5 rounded-lg bg-white p-2.5 text-[0.625rem] leading-4">
              <strong className="font-bold">{t("Order time")}</strong>
              <span>{dayjs(props.details.created_at).toDateTimeString()}</span>
            </div>
          </div>
        </AccordionContent>
      </Accordion>

      {props.details.lottery?.ranks && (
        <Transition.Root as={Fragment} show={show}>
          <Dialog className="fixed inset-0 z-snackbar flex flex-col overflow-y-auto" onClose={setShow.bind(0, false)}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              leave="transition-opacity duration-300"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              leave="transition-opacity duration-300"
              leaveTo="opacity-0"
            >
              <div className="relative m-auto w-full max-w-[430px] p-5">
                <Dialog.Panel className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-red-300">
                  <header className="flex items-center gap-2.5 bg-red-300 px-2.5 py-3 text-white">
                    <World size={rem(20)} />
                    <Dialog.Title className="mr-auto font-bold">{props.title ?? "Vietnam Lottery"}</Dialog.Title>

                    <strong className="text-[0.625rem]">
                      {dayjs(props.details.created_at)
                        .locale(locale)
                        .format(`${locale === "vi" ? "M" : ""}MMM DD, YYYY`)}
                    </strong>
                  </header>

                  <div className="max-h-[65vh] space-y-4 overflow-y-auto bg-red-50 px-2.5 py-4">
                    <table className="w-full border-collapse text-center text-xs">
                      <colgroup>
                        <col className="border-r border-red-100/25" />
                      </colgroup>
                      <tbody className="divide-y divide-red-100/25">
                        {Object.keys(props.details.lottery.ranks).map((rank, index) => (
                          // eslint-disable-next-line react/no-array-index-key -- -
                          <tr key={index}>
                            <th className="whitespace-nowrap px-2 py-2.5 text-left">{getResultTitle(rank)}</th>
                            <td className="w-full">
                              <div
                                className={`grid grid-cols-${props.details.lottery?.ranks![rank as keyof typeof props.details.lottery.ranks].length} justify-around gap-2 px-2 py-2.5`}
                              >
                                {props.details.lottery?.ranks![rank as keyof typeof props.details.lottery.ranks].map(
                                  (result, i) => (
                                    <span
                                      className={rank === "special_prize" ? "text-base font-bold text-red-500" : ""}
                                      // eslint-disable-next-line react/no-array-index-key -- -
                                      key={i}
                                    >
                                      {result}
                                    </span>
                                  ),
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Dialog.Panel>

                <div className="pointer-events-none mt-3 flex justify-center">
                  <XCircle className="size-6 text-white" />
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}

const card = cva(
  "relative flex gap-3 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white",
  {
    variants: {
      status: {
        win: "bg-green-800",
        lost: "bg-red-100",
        pending: "bg-blue-500",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  },
);

const profit = cva("", {
  variants: {
    status: {
      win: "text-green-800",
      lost: "text-red-300",
      pending: "text-blue-500",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});
