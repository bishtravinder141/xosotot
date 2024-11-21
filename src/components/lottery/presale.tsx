"use client";

import XCircle from "@components/icon/custom/x-circle";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";

export default function LotteryPresale() {
  const t = useTranslations();

  const [show, setShow] = useState(false);

  return (
    <>
      <button className="text-black underline" onClick={setShow.bind(0, true)} type="button">
        {t("presale.label")}
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
                <Dialog.Title className="px-5 text-center font-bold">{t("presale.label")}</Dialog.Title>

                <pre className="max-h-[65vh] space-y-3 overflow-y-auto whitespace-pre-wrap px-5 text-xs">
                  {t("presale.rules")}
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
