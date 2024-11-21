import { actualize } from "@action/otp/phone";
import { verify } from "@action/profile";
import Form from "@components/form/form";
import OneTimePassword from "@components/form/one-time-password";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { AVAILABLE_COUNTRY_CODES } from "@config/phone";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import { notFound } from "next/navigation";

export default async function EditProfileMobilePage() {
  const t = await getTranslations();
  const { user } = await getSession();

  if (user.phone_verified_at) {
    notFound();
  }

  const countryCode = AVAILABLE_COUNTRY_CODES.find((item) => user.phone?.startsWith(item));
  const phone = user.phone?.slice(countryCode?.length);

  return (
    <>
      <UserTokenValidator />

      <Form action={verify} className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Mobile")}</span>
          <div className="flex gap-1.5 rounded-lg bg-white px-3 py-1">
            <label className="relative pr-3">
              <select
                autoComplete="tel-country-code"
                className="appearance-none bg-transparent py-2 text-xs text-black"
                defaultValue={countryCode}
                name="tel-country-code"
                required
              >
                {AVAILABLE_COUNTRY_CODES.map((code) => (
                  <option key={code} value={code}>{`+${code}`}</option>
                ))}
              </select>
              <CaretDownFill className="absolute right-0 top-3" size={rem(8)} />
            </label>
            <input
              className="flex-1 bg-transparent py-2 text-xs text-black"
              defaultValue={phone}
              name="tel-national"
              required
              type="text"
            />
            <OneTimePassword action={actualize} className="text-[0.5rem] font-bold text-blue-500" />
          </div>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Verification Code")}</span>

          <div className="flex rounded-lg bg-white px-3 py-1">
            <input
              autoComplete="one-time-code"
              className="flex-1 bg-transparent py-2 text-xs text-black"
              name="verification_code"
              placeholder={t("Verification Code")}
              required
              type="text"
            />
          </div>
        </div>

        <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Verify")}
        </SubmitButton>
      </Form>
    </>
  );
}
