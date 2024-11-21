"use client";

import WarningAlert from "@components/alert/warning";
import SubmitButton from "@components/shared/submit-button";
import { useTranslations } from "next-intl";
import type { MouseEvent } from "react";
import { toast } from "sonner";

type WithdrawSubmitButtonProps = {
  verified?: boolean;
  className?: string;
};

export default function WithdrawSubmitButton(props: WithdrawSubmitButtonProps) {
  const t = useTranslations();

  return (
    <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white" onClick={onClick}>
      {t("Withdraw")}
    </SubmitButton>
  );

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    if (props.verified === false) {
      event.preventDefault();

      toast.custom((id) => (
        <WarningAlert
          actions={[{ url: "/profile/edit/mobile", label: t("Verify") }]}
          id={id}
          title={t("Please verify your phone number before you can withdraw")}
        />
      ));
    }
  }
}
