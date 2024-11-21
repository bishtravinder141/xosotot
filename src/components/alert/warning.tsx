"use client";

import warning from "@assets/images/general/warning.png";
import XCircle from "@components/icon/custom/x-circle";
import NextImage from "next/image";
import NextLink from "next/link";
import type { ReactElement } from "react";
import { toast } from "sonner";

type AlertAction = {
  url: string;
  label: string;
};

type AlertProps = {
  id?: number | string;
  icon?: ReactElement;
  title: string;
  actions?: AlertAction[];
};

export default function WarningAlert(props: AlertProps) {
  return (
    <div className="flex gap-2.5 rounded-xl from-yellow-700 to-yellow-400 to-[125%] p-2.5 text-white shadow bg-gradient-[72] min-[601px]:w-[var(--width)]">
      <div className="size-12 shrink-0 rounded-full bg-white">
        {props.icon ?? <NextImage alt="Success" className="size-full" priority src={warning} />}
      </div>
      <div className="flex w-0 grow flex-col gap-1 py-1.5">
        <p className="text-sm font-bold">{props.title}</p>

        {props.actions && (
          <div className="flex gap-2">
            {props.actions.map((action) => (
              <NextLink
                className="rounded bg-white px-2.5 py-1 text-xs font-medium text-black"
                href={action.url}
                key={action.label}
                onClick={onDismiss}
              >
                {action.label}
              </NextLink>
            ))}
          </div>
        )}
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
