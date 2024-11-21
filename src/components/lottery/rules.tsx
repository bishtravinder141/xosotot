"use client";

import XCircle from "@components/icon/custom/x-circle";
import InfoFilled from "@components/icon/epi/info-filled";
import { Dialog, Transition } from "@headlessui/react";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { Fragment, useState } from "react";

export default function LotteryRules(props: PropsWithChildren) {
  const t = useTranslations();

  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="!mt-4 flex w-full gap-1.5 rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold uppercase text-white bg-gradient-[177]"
        onClick={setShow.bind(0, true)}
        type="button"
      >
        {t("How to play")}
        <InfoFilled size={rem(24)} />
      </button>

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
            <div className="relative m-auto w-full max-w-xs p-5">
              <Dialog.Panel className="relative space-y-3 rounded-2xl bg-white py-5">
                <Dialog.Title className="px-5 text-center font-bold">{t("How to play")}</Dialog.Title>

                <pre className="max-h-[65vh] space-y-3 overflow-y-auto whitespace-pre-wrap px-5 text-xs">
                  {props.children}
                </pre>
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
