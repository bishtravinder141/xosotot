"use client";

import DangerAlert from "@components/alert/danger";
import SuccessAlert from "@components/alert/success";
import Copy from "@components/icon/custom/copy";
import { useTranslations } from "next-intl";
import type { HTMLAttributes, MouseEvent } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { useClipboard } from "use-clipboard-copy";

type ClipboardFieldProps = Omit<HTMLAttributes<HTMLButtonElement>, "value"> & {
  value: string;
};

export default function ClipboardField(props: ClipboardFieldProps) {
  const { value, className, ...attrs } = props;

  const t = useTranslations();
  const clipboard = useClipboard({
    onError() {
      toast.custom((id) => <DangerAlert id={id} title={t("Something went wrong")} />);
    },
    onSuccess() {
      toast.custom((id) => <SuccessAlert id={id} title={t("Copied")} />);
    },
  });

  return (
    <button {...attrs} className={twMerge("flex justify-between", className)} onClick={onClick} type="button">
      {value}

      <Copy className="self-center text-gray-700" />
    </button>
  );

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    clipboard.copy(value);

    props.onClick?.(event);
  }
}
