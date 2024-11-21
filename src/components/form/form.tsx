"use client";

import DangerAlert from "@components/alert/danger";
import SuccessAlert from "@components/alert/success";
import { useTranslations } from "next-intl";
import type { HTMLAttributes } from "react";
import { toast } from "sonner";

type FormProps = Omit<HTMLAttributes<HTMLFormElement>, "action"> & {
  action: (data: FormData) => Promise<{ message: string } | { error?: string | undefined } | undefined>;
};

export default function Form(props: FormProps) {
  const t = useTranslations();

  return <form {...props} action={submit as never} />;

  async function submit(data: FormData) {
    try {
      const response = await props.action(data);

      if (response && "error" in response) {
        toast.custom((id) => <DangerAlert id={id} title={response.error ?? t("Something went wrong")} />);
        return;
      }

      if (response && "message" in response) {
        toast.custom((id) => <SuccessAlert id={id} title={response.message} />);
      }
    } catch (error) {
      toast.custom((id) => <DangerAlert id={id} title={t("Something went wrong")} />);
    }
  }
}
