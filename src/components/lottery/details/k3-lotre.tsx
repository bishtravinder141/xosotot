import notebook from "@assets/images/general/notebook.png";
import LotteryK3LotreDetailsCard from "@components/lottery/details/k3-lotre-card";
import GamingPagination from "@components/shared/gaming-pagination";
import { getK3LotreHistory } from "@data/lottery/k3-lotre";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type LotteryK3LotreDetailsProps = {
  page: number;
  type: string;
};

export default async function LotteryK3LotreDetails(props: LotteryK3LotreDetailsProps) {
  const t = await getTranslations();
  const history = await getK3LotreHistory(props.page, { type: props.type }).catch((error: unknown) => {
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
        <LotteryK3LotreDetailsCard details={record} key={record.id} />
      ))}

      {history.meta.pagination.total > history.meta.pagination.limit && (
        <GamingPagination {...history.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
