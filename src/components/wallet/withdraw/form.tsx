"use client";

import Form from "@components/form/form";
import { useTranslations } from "next-intl";
import type { HTMLAttributes } from "react";

type WithdrawFormProps = Omit<HTMLAttributes<HTMLFormElement>, "action"> & {
  action: (data: FormData) => Promise<{ message: string } | { error?: string | undefined } | undefined>;
  active?: boolean;
};

export default function WithdrawForm(props: WithdrawFormProps) {
  const t = useTranslations();

  const { action, active, ...attrs } = props;

  return <Form {...attrs} action={active ? action : warning} />;

  async function warning() {
    return { error: t("You do not meet the withdrawal requirements") };
  }
}
