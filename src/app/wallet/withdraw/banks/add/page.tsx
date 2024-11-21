import { add } from "@action/payment/bank";
import Form from "@components/form/form";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import HolderNameInput from "@components/wallet/holder-name-input";
import { BANK_NAMES } from "@config/transaction";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";

export default async function WithdrawAddBankPage() {
  const t = await getTranslations();
  const { user } = await getSession();

  return (
    <>
      <UserTokenValidator />

      <Form action={add} className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Bank Name")}</span>
          <label className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5">
            <select className="w-full appearance-none text-xs text-black" name="bank" required>
              {BANK_NAMES.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <CaretDownFill size={rem(8)} />
          </label>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Holder Name")}</span>

          {user.real_name ? (
            <input
              className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black opacity-60"
              defaultValue={user.real_name.toUpperCase()}
              name="holder"
              placeholder={`${t("Its required")} *`}
              readOnly
              type="text"
            />
          ) : (
            <HolderNameInput name="holder" placeholder={`${t("Its required")} *`} />
          )}

          <div className="!mt-1 text-[0.625rem] font-medium leading-3 tracking-wide text-red-300">
            <p>{`${t("First and last names must be capitalized without accents and separated by a space")}!`}</p>
            <p>{`${t("For example")}:  DINH THI HUYEN`}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Account Number")}</span>
          <input
            className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            inputMode="numeric"
            name="account"
            placeholder={`${t("Its required")} *`}
            required
            type="number"
          />
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Mobile")}</span>
          <input
            className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            inputMode="numeric"
            name="phone"
            placeholder={`${t("Its required")} *`}
            required
            type="number"
          />
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">Email</span>
          <input
            className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            name="email"
            placeholder={`${t("Its required")} *`}
            required
            type="email"
          />
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Branch")}</span>
          <input
            className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            name="branch"
            placeholder={`${t("Its required")} *`}
            required
            type="text"
          />
        </div>

        <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Add Bank Account")}
        </SubmitButton>
      </Form>
    </>
  );
}
