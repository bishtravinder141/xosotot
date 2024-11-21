"use client";

import DangerAlert from "@components/alert/danger";
import SuccessAlert from "@components/alert/success";
import Spinner from "@components/shared/spinner";
import useLocalStorage from "@hooks/local-storage";
import { useTranslations } from "next-intl";
import type { HTMLAttributes, MouseEvent } from "react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type OneTimePasswordProps = HTMLAttributes<HTMLButtonElement> & {
  action: (data: FormData) => Promise<{ message: string } | { error?: string | undefined } | undefined>;
  duration?: number;
  onSubmitted?: VoidFunction;
};

export default function OneTimePassword(props: OneTimePasswordProps) {
  const { action, duration = 120_000, onSubmitted, ...attrs } = props;

  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  const [time, setTime] = useState(Date.now());
  const [value, setValue] = useLocalStorage("otp-expired");
  const expired = value ? parseInt(value) - time : 0;

  useEffect(() => {
    if (expired < 1) {
      return;
    }

    const timer = setInterval(() => {
      setTime((state) => state + 1_000);
    }, 1_000);

    return function cancel() {
      clearInterval(timer);
    };
  }, [expired]);

  return (
    <button {...attrs} disabled={expired > 0} onClick={onClick} type="button">
      {/* eslint-disable-next-line no-nested-ternary -- - */}
      {isPending ? <Spinner /> : expired > 0 ? (expired / 1000).toFixed(0).padStart(2, "0") : "OTP"}
    </button>
  );

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    const data = new FormData((event.target as unknown as { form: HTMLFormElement | null }).form ?? void 0);

    startTransition(async () => {
      try {
        const response = await action(data);

        if (response && "error" in response) {
          toast.custom((id) => <DangerAlert id={id} title={response.error ?? t("Something went wrong")} />);
          return;
        }

        if (response && "message" in response) {
          toast.custom((id) => <SuccessAlert id={id} title={response.message} />);
        }

        setValue((Date.now() + duration - 1_000).toString());
        setTime(Date.now());

        onSubmitted?.();
      } catch (error) {
        toast.custom((id) => <DangerAlert id={id} title={t("Something went wrong")} />);
      }
    });
  }
}
