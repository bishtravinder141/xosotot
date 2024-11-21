"use client";

import ChevronLeft from "@components/icon/custom/chevron-left";
import BottomAppbar from "@components/layout/bottom-appbar";
import TopAppbar from "@components/layout/top-appbar";
import TopAppBarTitle from "@components/layout/top-appbar/title";
import type { Advertisement } from "@data/ads";
import { Dialog } from "@headlessui/react";
import NextImage from "next/image";
import { Fragment, useState } from "react";

type AdvertisementDialogProps = {
  advertisement: Advertisement;
};

export default function AdvertisementDialog(props: AdvertisementDialogProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="flex flex-col overflow-hidden rounded-lg bg-gray-900 text-white"
        key={props.advertisement.id}
        onClick={setShow.bind(0, true)}
        type="button"
      >
        <NextImage
          alt="Win Go"
          className="aspect-video"
          height={167.14}
          priority
          src={props.advertisement.image}
          width={390}
        />

        <span className="p-2.5 text-left text-sm font-bold tracking-wide">{props.advertisement.title}</span>
      </button>

      <Dialog as={Fragment} onClose={setShow.bind(0, false)} open={show}>
        <div className="fixed inset-0 z-snackbar overflow-hidden overflow-y-auto bg-white">
          <TopAppbar>
            <button className="size-9 rounded-full bg-white" onClick={setShow.bind(0, false)} type="button">
              <ChevronLeft className="m-3.5 size-2 text-red-200" />
            </button>

            <TopAppBarTitle>{props.advertisement.title}</TopAppBarTitle>
          </TopAppbar>

          <div className="container scroll-mt-16 space-y-5 py-3 mb-safe-offset-24 mt-safe-offset-16">
            <div
              className="space-y-3 overflow-y-auto whitespace-pre-wrap text-xs [&_h1]:text-center [&_h1]:text-base [&_h1]:font-bold"
              dangerouslySetInnerHTML={{ __html: props.advertisement.description }}
            />
          </div>

          <BottomAppbar />
        </div>
      </Dialog>
    </>
  );
}
