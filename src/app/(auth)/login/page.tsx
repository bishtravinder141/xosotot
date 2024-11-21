import { login } from "@action/auth";
import banner from "@assets/images/login/banner.jpeg";
import Form from "@components/form/form";
import PasswordField from "@components/form/password";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import ChevronLeft from "@components/icon/custom/chevron-left";
import Google from "@components/icon/custom/google";
import Telegram from "@components/icon/custom/telegram";
import SubmitButton from "@components/shared/submit-button";
import { AVAILABLE_COUNTRY_CODES } from "@config/phone";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function LoginPage() {
  const t = await getTranslations();

  return (
    <>
      <header className="mt-2 flex items-center justify-between gap-3">
        <NextLink className="size-9 rounded-full bg-red-200 p-3.5 text-white" href="/">
          <ChevronLeft size={rem(8)} />
        </NextLink>

        <h1 className="font-bold">{t("Sign in")}</h1>

        <div className="w-9" />
      </header>

      <div className="space-y-2.5">
        <NextImage alt="Banner" className="rounded-lg" priority src={banner} />

        <p className="w-8/12 text-sm">{t("Enter your details to enter your personal account")}</p>
      </div>

      <Form action={login} className="!mb-2 flex flex-col gap-2.5">
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

        <PasswordField autoComplete="current-password" name="password" placeholder={t("Your password")} required />

        <SubmitButton className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]">
          {t("Log In")}
        </SubmitButton>

        <NextLink
          className="flex w-full justify-center rounded-lg from-red-700 from-15% to-red-300 to-80% p-3 font-bold text-white bg-gradient-[177]"
          href="/registration"
        >
          {t("Registration")}
        </NextLink>

        <div className="flex gap-2.5 text-[0.625rem] font-bold text-white">
          <NextLink
            className="flex w-0 grow items-center justify-center gap-1 rounded-lg bg-[#EC4737] p-3"
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`}
          >
            <Google className="rounded-full bg-white p-1" size={rem(24)} />
            {`${t("Log in with")} Google`}
          </NextLink>
          <NextLink
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#4678E3] p-3"
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/telegram`}
          >
            <Telegram size={rem(24)} />
            {`${t("Log in with")} Telegram`}
          </NextLink>
        </div>

        <NextLink
          className="flex w-full justify-center rounded-lg p-3 text-xs text-gray-800 ring-2 ring-red-300"
          href="/forgot-password"
        >
          {t("Forgot Password")}
        </NextLink>
      </Form>
    </>
  );
}
