import notebook from "@assets/images/general/notebook.png";
import Ball from "@components/icon/xosotot/ball";
import GamingPagination from "@components/shared/gaming-pagination";
import { LOTTERY_NUMBERS } from "@config/lottery";
import { getWinGoWinners } from "@data/lottery/win-go";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";

function getColor(value: string) {
  const number = LOTTERY_NUMBERS.find((item) => item.value === value);

  return (number?.color ?? "black") as never;
}

type LotteryWinGoHistoryProps = {
  page: number;
  type: string;
};

export default async function LotteryWinGoHistory(props: LotteryWinGoHistoryProps) {
  const t = await getTranslations();
  const winners = await getWinGoWinners(props.type, props.page).catch((error: unknown) => {
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
          <span className="flex-1">{t(parseInt(record.result) > 4 ? "Big" : "Small")}</span>
          <span className="flex flex-1 justify-center">
            <Ball className="-my-0.5 text-2xl" color={getColor(record.result)} size={rem(20)}>
              {record.result}
            </Ball>
          </span>
        </div>
      ))}

      {winners.meta.pagination.total > winners.meta.pagination.limit && (
        <GamingPagination {...winners.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
