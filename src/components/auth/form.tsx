"use client";

import { register } from "@action/auth";
import Form from "@components/form/form";
import PasswordField from "@components/form/password";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import Check from "@components/icon/custom/check";
import Google from "@components/icon/custom/google";
import Telegram from "@components/icon/custom/telegram";
import SubmitButton from "@components/shared/submit-button";
import { AVAILABLE_COUNTRY_CODES } from "@config/phone";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useState } from "react";

type AuthFormProps = {
  code?: string;
};

export default function AuthForm(props: AuthFormProps) {
  const t = useTranslations();

  const [ref, setRef] = useState(props.code);

  return (
    <Form action={register} className="!mb-2 flex flex-col gap-2.5">
      <div className="flex gap-3 rounded-lg bg-blue-100 px-3 py-2">
        <label className="relative pr-3">
          <select
            autoComplete="tel-country-code"
            className="appearance-none bg-transparent py-1"
            name="tel-country-code"
            required
          >
            {AVAILABLE_COUNTRY_CODES.map((code) => (
              <option key={code} value={code}>{`+${code}`}</option>
            ))}
          </select>
          <CaretDownFill className="absolute right-0 top-2.5" size={rem(12)} />
        </label>
        <div className="w-px bg-black" />
        <input
          autoComplete="tel-national"
          className="flex-1 bg-transparent py-2 text-xs"
          inputMode="numeric"
          name="tel-national"
          placeholder={t("Enter you phone")}
          required
          type="number"
        />
      </div>

      <PasswordField autoComplete="new-password" name="password" placeholder={t("Password")} required />
      <PasswordField name="repeat-password" placeholder={t("Repeat password")} required />

      <div className="flex rounded-lg bg-blue-100 px-3 py-2">
        <input
          className="flex-1 bg-transparent py-2 text-xs"
          name="ref"
          onChange={(event) => {
            setRef(event.target.value);
          }}
          placeholder={t("Please enter the invitation code (Optional)")}
          type="text"
          value={ref}
        />
      </div>

      <label className="flex items-center gap-3">
        <div className="relative inline-flex size-4">
          <input className="peer h-full w-full" name="agree" required type="radio" />
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-white text-white ring-1 ring-gray-200 transition-colors peer-checked:bg-red-300 peer-checked:ring-red-300">
            <Check size={rem(10)} />
          </span>
        </div>
        <p className="text-xs text-gray-600">
          {`${t("I agree")} `}
          <NextLink className="text-black" href="/about/privacy-policy">
            {t("Privacy Policy")}
          </NextLink>
        </p>
      </label>

      <SubmitButton className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]">
        {t("Registration")}
      </SubmitButton>

      <p className="text-center text-xs text-gray-600">
        {`${t("Already have an account")}, `}
        <NextLink className="lowercase text-black" href="/login">
          {t("Log In")}
        </NextLink>
      </p>

      <div className="mt-4 flex gap-2.5 text-[0.625rem] font-bold text-white">
        <NextLink
          className="flex w-0 grow items-center justify-center gap-1 rounded-lg bg-[#EC4737] p-3"
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google?inv=${ref}`}
        >
          <Google className="rounded-full bg-white p-1" size={rem(24)} />
          {`${t("Register with")} Google`}
        </NextLink>
        <NextLink
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#4678E3] p-3"
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/telegram?inv=${ref}`}
        >
          <Telegram size={rem(24)} />
          {`${t("Register with")} Telegram`}
        </NextLink>
      </div>
    </Form>
  );
}
