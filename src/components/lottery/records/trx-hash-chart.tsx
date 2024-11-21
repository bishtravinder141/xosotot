import notebook from "@assets/images/general/notebook.png";
import Ball from "@components/icon/xosotot/ball";
import LotteryCartLine from "@components/lottery/records/chart-line";
import GamingPagination from "@components/shared/gaming-pagination";
import { LOTTERY_NUMBERS } from "@config/lottery";
import { getTrxHashWinners } from "@data/lottery/trx-hash";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";

type LotteryTrxHashChartProps = {
  page: number;
  type: string;
};

export default async function LotteryTrxHashChart(props: LotteryTrxHashChartProps) {
  const t = await getTranslations();
  const winners = await getTrxHashWinners(props.type, props.page).catch((error: unknown) => {
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
      {winners.data.map((record, index, list) => (
        <div
          className="flex gap-4 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-[0.625rem] leading-4 text-white"
          key={record.id}
        >
          <span className="w-20 text-left">{`${dayjs().format("YYYYMMDD")}${record.id.toString()}`}</span>
          <div className="relative flex w-54 grow gap-1">
            {LOTTERY_NUMBERS.map((number) => (
              <Ball
                className="z-[1] text-2xl"
                color={(number.value === record.result ? number.color : "gray") as never}
                key={number.value}
                size={rem(16)}
              >
                {number.value}
              </Ball>
            ))}
            <Ball className="z-[1] text-2xl" color="yellow" size={rem(16)}>
              {parseInt(record.result) > 4 ? "B" : "S"}
            </Ball>
            {index > 0 && (
              <LotteryCartLine current={parseInt(record.result)} previous={parseInt(list[index - 1].result)} />
            )}
          </div>
        </div>
      ))}

      {winners.meta.pagination.total > winners.meta.pagination.limit && (
        <GamingPagination {...winners.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
