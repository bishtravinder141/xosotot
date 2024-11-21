import Skeleton from "@components/shared/skeleton";
import SubmitButton from "@components/shared/submit-button";
import WalletRechargeAmount from "@components/wallet/recharge/amount";
import { TRANSACTION_AMOUNTS } from "@config/transaction";
import { getTranslations } from "@lib/translation";

export default async function RechargeLoading() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
      <div className="flex items-center gap-2">
        <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
      </div>

      <Skeleton className="h-10 rounded-md" />

      <Skeleton className="h-[4.75rem] rounded-md" />

      <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

      <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />

      <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
        {t("Recharge")}
      </SubmitButton>
    </div>
  );
}
