"use client";

import XCircle from "@components/icon/custom/x-circle";
import { LOTTERY_AUTOCLOSE_DELAY } from "@config/lottery";
import { Dialog, Transition } from "@headlessui/react";
import useLocalStorage from "@hooks/local-storage";
import { useTranslations } from "next-intl";
import type { ChangeEventHandler, PropsWithChildren } from "react";
import { Fragment, useEffect, useState } from "react";

type LotteryBetResultPopupProps = PropsWithChildren<{
  id: string;
}>;

export default function LotteryBetResultPopup(props: LotteryBetResultPopupProps) {
  const t = useTranslations();
  const [duration, setDuration] = useState(LOTTERY_AUTOCLOSE_DELAY);
  const [closable, setClosable] = useLocalStorage("result-popup-auto-close", {
    encoder: String,
    decoder(value) {
      return value === "true";
    },
  });
  const [history, setHistory] = useLocalStorage("result-history", {
    encoder(data: Record<string, number>) {
      return JSON.stringify(data);
    },
    decoder(data) {
      return JSON.parse(data ?? "{}");
    },
  });

  const onChangeAutoClose: ChangeEventHandler<HTMLInputElement> = (event) => {
    setClosable(event.target.checked);
  };

  const onUpdateHistory = () => {
    setHistory((state) => {
      const newState: Record<string, number> = {};

      for (const id of Object.keys(state)) {
        if (Date.now() - state[id] > 600_000) {
          newState[id] = state[id];
        }
      }

      newState[props.id] = Date.now();

      return newState;
    });
  };

  useEffect(() => {
    if (!closable || duration < 0) {
      return;
    }

    const timer = setTimeout(() => {
      setDuration(duration - 1);
    }, 1000);

    return function cancel() {
      clearTimeout(timer);
    };
  }, [props.id, closable, duration]);

  return props.id in history ? null : (
    <Transition.Root afterLeave={onUpdateHistory} as={Fragment} show={duration > 0}>
      <Dialog className="fixed inset-0 z-snackbar flex flex-col overflow-y-auto" onClose={setDuration.bind(0, 0)}>
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
            <Dialog.Panel className="relative rounded-2xl bg-gradient-to-b from-red-50 from-[-150%] to-red-200 to-70% p-5 text-white">
              {props.children}

              <div className="relative mt-12 flex">
                <label className="flex cursor-pointer select-none gap-2.5">
                  <input
                    className="peer hidden"
                    defaultChecked={closable}
                    onChange={onChangeAutoClose}
                    type="checkbox"
                  />
                  <span className="inline-flex rounded-full p-0.5 text-transparent ring-1 ring-white peer-checked:text-white">
                    <span className="m-px size-2.5 rounded-full bg-current transition-colors" />
                  </span>
                  <p className="text-xs">
                    {t("{value} seconds auto close", {
                      value: duration,
                    })}
                  </p>
                </label>
              </div>
            </Dialog.Panel>

            <div className="mt-3 flex justify-center">
              <XCircle className="pointer-events-none size-6 text-white" />
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
