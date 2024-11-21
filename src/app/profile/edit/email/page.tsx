import { actualize, verify } from "@action/otp/email";
import EmailVerifiedField from "@components/form/email-verified";
import Form from "@components/form/form";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { notFound } from "next/navigation";

export default async function EditProfileEmailPage() {
  const t = await getTranslations();
  const session = await getSession();

  if (session.user.email_verified_at) {
    notFound();
  }

  return (
    <>
      <UserTokenValidator />

      <Form action={verify} className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="space-y-2.5">
          <span className="text-xs font-bold">Email</span>

          <EmailVerifiedField
            actualize={actualize}
            defaultValue={session.user.email}
            name="email"
            placeholder={t("Write here")}
            required
          />
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
