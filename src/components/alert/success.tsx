"use client";

import success from "@assets/images/general/success.png";
import XCircle from "@components/icon/custom/x-circle";
import NextImage from "next/image";
import type { ReactElement } from "react";
import { toast } from "sonner";

type AlertProps = {
  id?: number | string;
  icon?: ReactElement;
  title: string;
};

export default function SuccessAlert(props: AlertProps) {
  return (
    <div className="flex gap-2.5 rounded-xl from-green-800 to-green-600 to-[125%] p-2.5 text-white shadow bg-gradient-[53] min-[601px]:w-[var(--width)]">
      <div className="size-12 shrink-0 rounded-full bg-white">
        {props.icon ?? <NextImage alt="Success" className="size-full" priority src={success} />}
      </div>
      <div className="flex w-0 grow flex-col gap-1 py-1.5">
        <p className="text-sm font-bold">{props.title}</p>
      </div>
      {props.id && (
        <div className="shrink-0">
          <button onClick={onDismiss} type="button">
            <XCircle className="size-4 text-white" />
          </button>
        </div>
      )}
    </div>
  );

  function onDismiss() {
    toast.dismiss(props.id);
  }
}
