import WalletWithdrawWinners from "@components/wallet/withdraw/winners";
import WalletWithdrawWinnersSkeleton from "@components/wallet/withdraw/winners.skeleton";
import { getTopWithdrawals } from "@data/withdrawals";
import { getTranslations } from "@lib/translation";
import { Suspense } from "react";

export default async function HomeWinnersSlot() {
  const t = await getTranslations();
  const withdrawals = await getTopWithdrawals();

  if (withdrawals.length < 4) {
    return null;
  }

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-500">{t("Winning information")}</h2>

      <Suspense fallback={<WalletWithdrawWinnersSkeleton />}>
        <WalletWithdrawWinners />
      </Suspense>
    </section>
  );
}
