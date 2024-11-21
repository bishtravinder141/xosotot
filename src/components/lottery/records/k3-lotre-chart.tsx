import notebook from "@assets/images/general/notebook.png";
import LotteryDice from "@components/lottery/k3/dice";
import GamingPagination from "@components/shared/gaming-pagination";
import { getK3LotreWinners } from "@data/lottery/k3-lotre";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { unique } from "@lib/list";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type LotteryK3LotreChartProps = {
  page: number;
  type: string;
};

export default async function LotteryK3LotreChart(props: LotteryK3LotreChartProps) {
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
      {winners.data.map((record) => {
        const diff = unique(record.result.split("")).length;

        return (
          <div
            className="flex gap-4 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-[0.625rem] leading-4 text-white"
            key={record.id}
          >
            <span className="w-20 text-left">{`${dayjs().format("YYYYMMDD")}${record.id.toString()}`}</span>
            <span className="w-28 grow whitespace-nowrap text-center">
              {diff < 3 ? t("{value} same numbers", { value: 4 - diff }) : t("{value} other numbers", { value: diff })}
            </span>
            <span className="flex w-20 grow justify-center gap-0.5">
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
        );
      })}

      {winners.meta.pagination.total > winners.meta.pagination.limit && (
        <GamingPagination {...winners.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
