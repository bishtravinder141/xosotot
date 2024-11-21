"use client";

import xosotot from "@assets/images/brand/xosotot-circle.png";
import { Portal, Transition } from "@headlessui/react";
import NextImage from "next/image";
import { Fragment } from "react";

type LoaderDialogProps = {
  show: boolean;
};

export default function LoaderDialog(props: LoaderDialogProps) {
  return (
    <Portal>
      <Transition as={Fragment} enterFrom="opacity-0" leaveTo="opacity-0" show={props.show}>
        <div className="fixed inset-0 z-snackbar flex flex-col overflow-hidden overflow-y-auto transition-opacity">
          <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />
          <div className="relative m-auto p-2">
            <NextImage alt="Xosotot" className="size-40 animate-scaling" priority src={xosotot} />
            <div className="absolute -inset-10">
              <svg className="size-full animate-spin text-christine-500" fill="none" viewBox="0 0 16 16">
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeDasharray="28 12"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  strokeWidth="0.25"
                />
                <circle cx="3.5" cy="2.5" fill="currentColor" r="0.75" />
              </svg>
            </div>
          </div>
        </div>
      </Transition>
    </Portal>
  );
}
