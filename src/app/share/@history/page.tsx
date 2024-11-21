import notebook from "@assets/images/general/notebook.png";
import LotteryHistoryCard from "@components/lottery/history/card";
import Pagination from "@components/shared/pagination";
import { getCommissionHistory } from "@data/commission";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type ShareHistorySlotProps = {
  searchParams: {
    page?: string;
  };
};

export default async function ShareHistorySlot(props: ShareHistorySlotProps) {
  const page = parseInt(props.searchParams.page ?? "1");

  const t = await getTranslations();
  const transactions = await getCommissionHistory(page).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (transactions === null || transactions.data.length < 1) {
    return (
      <div className="flex flex-col items-center gap-3 py-3">
        <NextImage alt="Notebook" className="max-w-24" src={notebook} />
        <p className="text-[0.625rem]">{t("No data available")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2.5">
        {transactions.data.map((transaction) => (
          <LotteryHistoryCard
            amount={transaction.amount}
            id={transaction.id}
            key={transaction.id}
            type={transaction.type}
            updated_at={transaction.updated_at}
          />
        ))}
      </div>

      {transactions.meta.pagination.total > transactions.meta.pagination.limit && (
        <Pagination {...transactions.meta.pagination} className="flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
