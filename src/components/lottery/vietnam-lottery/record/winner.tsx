"use client";

import XCircle from "@components/icon/custom/x-circle";
import World from "@components/icon/fluent-mdl2/world";
import Ball from "@components/icon/xosotot/ball";
import type { getVietnamLotteryWinners } from "@data/lottery/vietnam-lottery";
import { Dialog, Transition } from "@headlessui/react";
import dayjs from "@lib/dayjs";
import { rem } from "@lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useState } from "react";

type VietnamLotteryWinnerRecordProps = {
  title: string;
  record: Awaited<ReturnType<typeof getVietnamLotteryWinners>>["data"][number];
};

export default function VietnamLotteryWinnerRecord(props: VietnamLotteryWinnerRecordProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [show, setShow] = useState(false);

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
      <div className="flex gap-4 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white">
        <button className="w-20 text-left underline" onClick={setShow.bind(0, true)} type="button">
          {`${dayjs().format("YYYYMMDD")}${props.record.id.toString()}`}
        </button>
        <span className="w-20 whitespace-nowrap">{props.record.city.date}</span>
        <span className="flex w-32 grow justify-center gap-1">
          {props.record.result.split("").map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key -- -
            <Ball className="-my-0.5 text-2xl" color="gray" key={props.record.result + index} size={rem(20)}>
              {value}
            </Ball>
          ))}
        </span>
      </div>

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
                  <Dialog.Title className="mr-auto font-bold">{props.title}</Dialog.Title>

                  <strong className="text-[0.625rem]">
                    {dayjs(props.record.created_at)
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
                      {Object.keys(props.record.ranks).map((rank, index) => (
                        // eslint-disable-next-line react/no-array-index-key -- -
                        <tr key={index}>
                          <th className="whitespace-nowrap px-2 py-2.5 text-left">{getResultTitle(rank)}</th>
                          <td className="w-full">
                            <div
                              className={`grid grid-cols-${props.record.ranks[rank as keyof typeof props.record.ranks].length} justify-around gap-2 px-2 py-2.5`}
                            >
                              {props.record.ranks[rank as keyof typeof props.record.ranks].map((result, i) => (
                                <span
                                  className={rank === "special_prize" ? "text-base font-bold text-red-500" : ""}
                                  // eslint-disable-next-line react/no-array-index-key -- -
                                  key={i}
                                >
                                  {result}
                                </span>
                              ))}
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
    </>
  );
}
