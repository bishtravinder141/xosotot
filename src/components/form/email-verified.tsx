"use client";

import OneTimePassword from "@components/form/one-time-password";
import { useTranslations } from "next-intl";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";

type EmailVerifiedFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  actualize: (data: FormData) => Promise<{ message: string } | { error?: string | undefined } | undefined>;
};

export default function EmailVerifiedField(props: EmailVerifiedFieldProps) {
  const { actualize, ...attrs } = props;

  const t = useTranslations();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex gap-1.5 rounded-lg bg-white px-3 py-1">
        <input {...attrs} className="w-full rounded-lg bg-white py-2.5 pr-2 text-xs text-black" type="text" />

        <OneTimePassword
          action={actualize}
          className="text-[0.5rem] font-bold text-blue-500"
          duration={60_000}
          onSubmitted={setShow.bind(0, true)}
        />
      </div>

      {show && (
        <p className="text-[0.625rem] font-medium leading-3 tracking-wide text-gray-700">
          {t("Please check your inbox or spam folder")}
        </p>
      )}
    </>
  );
}
