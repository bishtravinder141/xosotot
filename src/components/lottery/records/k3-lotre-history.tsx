import notebook from "@assets/images/general/notebook.png";
import LotteryDice from "@components/lottery/k3/dice";
import GamingPagination from "@components/shared/gaming-pagination";
import { getK3LotreWinners } from "@data/lottery/k3-lotre";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type LotteryK3LotreHistoryProps = {
  page: number;
  type: string;
};

export default async function LotteryK3LotreHistory(props: LotteryK3LotreHistoryProps) {
  const t = await getTranslations();
  const winners = await getK3LotreWinners(props.type, props.page).catch((error: unknown) => {
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
        <div
          className="flex gap-4 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white"
          key={record.id}
        >
          <span className="w-20 text-left">{`${dayjs().format("YYYYMMDD")}${record.id.toString()}`}</span>
          <span className="w-10 grow">{record.sum}</span>
          <span className="flex w-28 grow justify-center gap-0.5">
            {record.result.split("").map((value, index, list) => (
              <LotteryDice
                className="-my-1.5 size-7 shrink-0"
                // eslint-disable-next-line react/no-array-index-key -- -
                key={record.id + index}
                offset={parseInt(list[(index + 1) % list.length])}
                size={7}
                value={parseInt(value)}
              />
            ))}
          </span>
        </div>
      ))}

      {winners.meta.pagination.total > winners.meta.pagination.limit && (
        <GamingPagination {...winners.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
