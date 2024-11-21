import notebook from "@assets/images/general/notebook.png";
import LotteryWinGoDetailsCard from "@components/lottery/details/win-go-card";
import GamingPagination from "@components/shared/gaming-pagination";
import { getWinGoHistory } from "@data/lottery/win-go";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type LotteryWinGoDetailsProps = {
  page: number;
  type: string;
};

export default async function LotteryWinGoDetails(props: LotteryWinGoDetailsProps) {
  const t = await getTranslations();
  const history = await getWinGoHistory(props.page, { type: props.type }).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (history === null || history.meta.pagination.total < 1) {
    return (
      <div className="flex flex-col items-center gap-3 py-3">
        <NextImage alt="Notebook" className="max-w-24" src={notebook} />
        <p className="text-[0.625rem]">{t("No data available")}</p>
      </div>
    );
  }

  return (
    <>
      {history.data.map((record) => (
        <LotteryWinGoDetailsCard details={record} key={record.id} />
      ))}

      {history.meta.pagination.total > history.meta.pagination.limit && (
        <GamingPagination {...history.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
