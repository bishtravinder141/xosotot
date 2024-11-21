"use client";

import XCircle from "@components/icon/custom/x-circle";
import BellNotification from "@components/icon/mdi/bell-notification";
import { Dialog, Transition } from "@headlessui/react";
import { rem } from "@lib/utils";
import type { PropsWithChildren } from "react";
import { Fragment } from "react";

type NotificationDialogProps = PropsWithChildren<{
  show: boolean;
  title: string;
  onClose: () => void;
  closable?: boolean;
}>;

export default function NotificationDialog(props: NotificationDialogProps) {
  return (
    <Transition.Root as={Fragment} show={props.show}>
      <Dialog className="fixed inset-0 z-snackbar flex flex-col overflow-y-auto" onClose={props.onClose}>
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
          <div className="relative m-auto w-full max-w-xs">
            <Dialog.Panel className="relative space-y-4 rounded-2xl bg-white px-3 pb-4">
              <div className="-mx-3 flex gap-2.5 rounded-t-2xl from-yellow-800 to-rose-500 to-[150%] px-6 py-3 text-white bg-gradient-[150]">
                <BellNotification size={rem(24)} />
                <span className="font-bold">{props.title}</span>
              </div>

              {props.children}
            </Dialog.Panel>

            {props.closable && (
              <div className="mt-3 flex justify-center">
                <XCircle className="pointer-events-none size-6 text-white" />
              </div>
            )}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
