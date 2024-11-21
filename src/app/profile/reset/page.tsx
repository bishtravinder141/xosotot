import { reset as resetPassword } from "@action/auth";
import { reset as sendResetCode } from "@action/otp/phone";
import Form from "@components/form/form";
import OneTimePassword from "@components/form/one-time-password";
import PasswordField from "@components/form/password";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";

export default async function ResetPasswordPage() {
  const t = await getTranslations();

  return (
    <>
      <UserTokenValidator />

      <Form action={resetPassword} className="flex flex-col gap-2.5 rounded-lg bg-blue-100 px-3 py-4">
        <span className="text-sm font-bold text-blue-500">{t("Verification Code")}</span>

        <div className="flex rounded-lg bg-white px-3 py-1">
          <input
            autoComplete="one-time-code"
            className="flex-1 bg-transparent py-2 text-xs"
            name="code"
            placeholder={t("Verification Code")}
            required
            type="text"
          />
          <OneTimePassword action={sendResetCode as never} className="text-[0.5rem] font-bold text-blue-500" />
        </div>

        <p className="w-9/12 text-[0.625rem]">
          {t("Can it receive the verification code? Please contact customer service")}
        </p>

        <span className="text-sm font-bold text-blue-500">{t("Your password")}</span>

        <PasswordField
          autoComplete="new-password"
          className="bg-white py-1"
          name="password"
          placeholder={t("Password")}
          required
          size={rem(20)}
        />

        <span className="text-sm font-bold text-blue-500">{t("Repeat password")}</span>

        <PasswordField className="bg-white py-1" name="repeat-password" placeholder={t("Password")} required />

        <SubmitButton className="w-full rounded-lg bg-blue-500 p-3 text-sm font-bold text-white">
          {t("Submit")}
        </SubmitButton>
      </Form>
    </>
  );
}
