import Plus from "@components/icon/custom/plus";
import UserTokenValidator from "@components/user/token-validator";
import BankCard from "@components/wallet/payment/bank-card";
import { getUserBanks } from "@data/payment";
import { UnauthorizedError } from "@lib/error";
import { getSelectedBank } from "@lib/payment/bank";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";

export default async function WithdrawBanksPage() {
  const t = await getTranslations();

  const selected = getSelectedBank();
  const banks = await getUserBanks().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <UserTokenValidator />

      {banks?.map((bank) => (
        <BankCard
          account={bank.bank_account}
          bank={bank.bank_name}
          holder={bank.full_name}
          id={bank.id}
          key={bank.id}
          selected={selected === bank.id.toString()}
        />
      ))}

      <NextLink
        className="flex items-center justify-center gap-2.5 rounded-lg bg-red-50 px-2 py-2.5 text-xs text-black"
        href="/wallet/withdraw/banks/add"
      >
        <Plus className="my-1 text-blue-500" size={rem(12)} />
        {t("Add card")}
      </NextLink>
    </>
  );
}
