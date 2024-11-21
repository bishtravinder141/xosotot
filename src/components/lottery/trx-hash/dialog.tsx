"use client";

import ChevronLeft from "@components/icon/custom/chevron-left";
import BottomAppbar from "@components/layout/bottom-appbar";
import TopAppbar from "@components/layout/top-appbar";
import TopAppBarTitle from "@components/layout/top-appbar/title";
import { Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";

type LotteryTrxHashDialogProps = {
  block: {
    id: string;
    number: number;
  };
};

export default function LotteryTrxHashDialog(props: LotteryTrxHashDialogProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="w-20 grow underline" onClick={setShow.bind(0, true)} type="button">
        {props.block.number}
      </button>

      <Dialog as={Fragment} onClose={setShow.bind(0, false)} open={show}>
        <div className="fixed inset-0 z-snackbar overflow-hidden bg-white">
          <TopAppbar>
            <button className="size-9 rounded-full bg-white" onClick={setShow.bind(0, false)} type="button">
              <ChevronLeft className="m-3.5 size-2 text-red-200" />
            </button>

            <TopAppBarTitle>TRX</TopAppBarTitle>
          </TopAppbar>

          <iframe
            className="-mt-16 h-[175%] w-full"
            src={`https://tronscan.org/#/block/${props.block.id}&title=TRX`}
            title="TRX"
          />

          <BottomAppbar />
        </div>
      </Dialog>
    </>
  );
}
