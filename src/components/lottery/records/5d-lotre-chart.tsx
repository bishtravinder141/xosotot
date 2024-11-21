import notebook from "@assets/images/general/notebook.png";
import Ball from "@components/icon/xosotot/ball";
import LotteryCartLine from "@components/lottery/records/chart-line";
import { TabsContent } from "@components/primitive/tabs";
import GamingPagination from "@components/shared/gaming-pagination";
import { LOTTERY_NUMBERS } from "@config/lottery";
import { get5DLotreWinners } from "@data/lottery/5d-lotre";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";

type Lottery5DLotreChartProps = {
  page: number;
  type: string;
};

export default async function Lottery5DLotreChart(props: Lottery5DLotreChartProps) {
  const t = await getTranslations();
  const winners = await get5DLotreWinners(props.type, props.page).catch((error: unknown) => {
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
            {"ABCDE".split("").map((group, position) => (
              <TabsContent key={group} value={group}>
                {LOTTERY_NUMBERS.map((number) => (
                  <Ball
                    className="z-[1] text-2xl"
                    color={(number.value.toString() === record.result[position] ? number.color : "gray") as never}
                    key={group + number.value}
                    size={rem(16)}
                  >
                    {number.value}
                  </Ball>
                ))}
                <Ball className="z-[1] text-2xl" color="yellow" size={rem(16)}>
                  {parseInt(record.result[position]) > 4 ? "B" : "S"}
                </Ball>
                {index > 0 && (
                  <LotteryCartLine
                    current={parseInt(record.result[position])}
                    previous={parseInt(list[index - 1].result[position])}
                  />
                )}
              </TabsContent>
            ))}
          </div>
        </div>
      ))}

      {winners.meta.pagination.total > winners.meta.pagination.limit && (
        <GamingPagination {...winners.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
