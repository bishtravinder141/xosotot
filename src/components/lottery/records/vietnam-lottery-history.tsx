import notebook from "@assets/images/general/notebook.png";
import VietnamLotteryWinnerRecord from "@components/lottery/vietnam-lottery/record/winner";
import GamingPagination from "@components/shared/gaming-pagination";
import { getVietnamLotteryWinners } from "@data/lottery/vietnam-lottery";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type LotteryVietnamLotteryHistoryProps = {
  page: number;
  area: number;
  city: string;
  title: string;
};

export default async function LotteryVietnamLotteryHistory(props: LotteryVietnamLotteryHistoryProps) {
  const t = await getTranslations();

  const winners = await getVietnamLotteryWinners(props.area, props.city, props.page).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (winners === null || winners.meta.pagination.total < 1) {
    return (
      <div className="flex flex-col items-center gap-3 py-3">
        <NextImage alt="Notebook" className="max-w-24" src={notebook} />
        <p className="text-[0.625rem]">{t("No data available")}</p>
      </div>
    );
  }

  return (
    <>
      {winners.data.map((record) => (
        <VietnamLotteryWinnerRecord key={record.id} record={record} title={props.title} />
      ))}

      {winners.meta.pagination.total > winners.meta.pagination.limit && (
        <GamingPagination {...winners.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
