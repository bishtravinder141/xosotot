import notebook from "@assets/images/general/notebook.png";
import Lottery5DLotreDetailsCard from "@components/lottery/details/5d-lotre-card";
import LotteryK3LotreDetailsCard from "@components/lottery/details/k3-lotre-card";
import LotteryTrxHashDetailsCard from "@components/lottery/details/trx-hash-card";
import LotteryVietnamLotteryDetailsCard from "@components/lottery/details/vietnam-lottery-card";
import LotteryWinGoDetailsCard from "@components/lottery/details/win-go-card";
import Pagination from "@components/shared/pagination";
import { getLotteryHistory } from "@data/lottery";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";
import { Fragment } from "react";

type ProfileLotteryHistoryProps = {
  page: number;
  date?: string;
  lottery: number;
};

export default async function ProfileLotteryHistory(props: ProfileLotteryHistoryProps) {
  const t = await getTranslations();

  const history = await getLotteryHistory(props.page, props.lottery, { date: props.date }).catch((error: unknown) => {
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
      <div className="space-y-2.5">
        {history.data.map((record) => (
          <Fragment key={record.id}>
            {props.lottery === 1 && <LotteryWinGoDetailsCard details={record as never} />}
            {props.lottery === 2 && <LotteryTrxHashDetailsCard details={record as never} />}
            {props.lottery === 3 && <Lottery5DLotreDetailsCard details={record as never} />}
            {props.lottery === 4 && <LotteryK3LotreDetailsCard details={record as never} />}
            {props.lottery === 5 && <LotteryVietnamLotteryDetailsCard details={record as never} />}
          </Fragment>
        ))}
      </div>

      {history.meta.pagination.total > history.meta.pagination.limit && (
        <Pagination {...history.meta.pagination} className="flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
