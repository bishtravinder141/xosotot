"use client";

import DangerAlert from "@components/alert/danger";
import SuccessAlert from "@components/alert/success";
import { useTranslations } from "next-intl";
import type { HTMLAttributes, MouseEvent } from "react";
import { toast } from "sonner";
import { useClipboard } from "use-clipboard-copy";

type ClipboardTriggerProps = Omit<HTMLAttributes<HTMLButtonElement>, "value"> & {
  value: string;
};

export default function ClipboardTrigger(props: ClipboardTriggerProps) {
  const { value, ...attrs } = props;

  const t = useTranslations();
  const clipboard = useClipboard({
    onError() {
      toast.custom((id) => <DangerAlert id={id} title={t("Something went wrong")} />);
    },
    onSuccess() {
      toast.custom((id) => <SuccessAlert id={id} title={t("Copied")} />);
    },
  });

  return <button type="button" {...attrs} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    clipboard.copy(value);

    props.onClick?.(event);
  }
}
