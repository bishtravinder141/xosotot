import notebook from "@assets/images/general/notebook.png";
import WalletTransactionCard from "@components/wallet/transaction/card";
import { getWithdrawalTransactions } from "@data/transaction";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function WalletWithdrawalTransactions() {
  const t = await getTranslations();
  const transactions = await getWithdrawalTransactions().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (transactions === null || transactions.data.length < 1) {
    return (
      <div className="flex flex-col items-center gap-3 py-3 pt-2.5">
        <NextImage alt="Notebook" className="max-w-24" src={notebook} />
        <p className="text-[0.625rem]">{t("No data available")}</p>
      </div>
    );
  }

  return (
    <div className="mt-2.5 space-y-2.5">
      {transactions.data.map((record) => (
        <WalletTransactionCard {...record} key={record.id} />
      ))}
    </div>
  );
}
