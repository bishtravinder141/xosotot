import { forgot } from "@action/auth";
import { reset } from "@action/otp/phone";
import banner from "@assets/images/forgot-password/banner.png";
import Form from "@components/form/form";
import OneTimePassword from "@components/form/one-time-password";
import PasswordField from "@components/form/password";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import ChevronLeft from "@components/icon/custom/chevron-left";
import SubmitButton from "@components/shared/submit-button";
import { AVAILABLE_COUNTRY_CODES } from "@config/phone";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function ForgotPasswordPage() {
  const t = await getTranslations();

  return (
    <>
      <header className="mt-2 flex items-center justify-between gap-3">
        <NextLink className="size-9 rounded-full bg-red-200 p-3.5 text-white" href="/login">
          <ChevronLeft size={rem(8)} />
        </NextLink>

        <h1 className="font-bold">{t("Forgot Password")}</h1>

        <div className="w-9" />
      </header>

      <div className="space-y-2.5">
        <NextImage alt="Banner" className="rounded-lg" priority src={banner} />

        <p className="w-8/12 text-sm">{t("Enter your details to enter your personal account")}</p>
      </div>

      <Form action={forgot} className="!mb-2 flex flex-col gap-2.5">
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

        <div className="flex gap-3 rounded-lg bg-blue-100 px-3 py-2">
          <input
            autoComplete="one-time-code"
            className="flex-1 bg-transparent py-2 text-xs"
            name="code"
            placeholder={t("Verification Code")}
            required
            type="text"
          />
          <OneTimePassword action={reset as never} className="text-xs font-bold text-blue-500" />
        </div>

        <PasswordField autoComplete="new-password" name="password" placeholder={t("Your password")} required />
        <PasswordField name="repeat-password" placeholder={t("Your password")} required />

        <SubmitButton className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]">
          {t("Submit")}
        </SubmitButton>
      </Form>
    </>
  );
}
