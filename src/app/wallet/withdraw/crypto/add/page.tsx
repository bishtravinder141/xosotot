import { add } from "@action/payment/crypto";
import Form from "@components/form/form";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { getTranslations } from "@lib/translation";

export default async function WithdrawAddCryptoPage() {
  const t = await getTranslations();

  return (
    <>
      <UserTokenValidator />

      <Form action={add} className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Wallet Address")}</span>
          <input
            className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            name="account"
            placeholder={`${t("Its required")} *`}
            required
            type="text"
          />
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Note")}</span>
          <textarea
            className="w-full resize-y rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            name="note"
            placeholder={`${t("Its required")} *`}
            required
            rows={5}
          />
        </div>

        <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Add USDT")}
        </SubmitButton>
      </Form>
    </>
  );
}
