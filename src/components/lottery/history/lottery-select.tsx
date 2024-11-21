"use client";

import lottery5DLotre from "@assets/images/lottery/5d-lotre/banner.jpg";
import lotteryK3Lotre from "@assets/images/lottery/k3-lotre/banner.jpg";
import lotteryTRXHash from "@assets/images/lottery/trx-hash/banner.jpg";
import lotteryVietnamLottery from "@assets/images/lottery/vietnam-lottery/banner.jpg";
import lotteryWinGo from "@assets/images/lottery/win-go/banner.jpg";
import ChevronDown from "@components/icon/custom/chevron-down";
import LoaderDialog from "@components/shared/loader-dialog";
import { Portal, Transition } from "@headlessui/react";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState, useTransition } from "react";
import { twMerge } from "tailwind-merge";

const lotteries = [
  { name: "Win Go", poster: lotteryWinGo },
  { name: "TRX Hash", poster: lotteryTRXHash },
  { name: "5D Lotre", poster: lottery5DLotre },
  { name: "K3 Lotre", poster: lotteryK3Lotre },
  { name: "Vietnam Lottery", poster: lotteryVietnamLottery },
];

type LotterySelectProps = {
  lottery: number;
};

export default function LotterySelect(props: LotterySelectProps) {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        className="flex w-0 grow items-center gap-2.5 rounded bg-red-50 p-2.5 text-xs font-bold leading-4"
        onClick={setShow.bind(0, true)}
        type="button"
      >
        {lotteries[props.lottery - 1].name}

        <ChevronDown className="ml-auto rotate-180" size={rem(12)} />
      </button>

      <Portal>
        <Transition className="fixed inset-0 z-snackbar" show={show}>
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
            <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-blue-100 pt-5 shadow-drawer pb-safe-or-5">
              <div className="container grid max-h-[75vh] grid-cols-2 gap-2.5 overflow-y-auto px-5">
                {lotteries.map((lottery, index) => (
                  <button
                    className={twMerge(
                      "flex items-center gap-2.5 rounded-md bg-white p-1 text-left text-[0.625rem] font-bold leading-3",
                      index === props.lottery - 1 && "bg-red-300 text-white",
                    )}
                    key={lottery.name}
                    onClick={onChange.bind(0, index + 1)}
                    type="button"
                  >
                    <NextImage
                      alt={lottery.name}
                      className="aspect-21/9 h-auto w-7/12 rounded"
                      placeholder="blur"
                      priority
                      src={lottery.poster}
                    />

                    {lottery.name}
                  </button>
                ))}
              </div>
            </div>
          </Transition.Child>
        </Transition>
      </Portal>

      <LoaderDialog show={isPending} />
    </>
  );

  function onChange(lottery: number) {
    const params = new URLSearchParams(window.location.search);

    if (lottery > 1) {
      params.set("lottery", lottery.toString());
    } else {
      params.delete("lottery");
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
