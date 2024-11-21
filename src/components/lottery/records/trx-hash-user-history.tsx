import notebook from "@assets/images/general/notebook.png";
import Ball from "@components/icon/xosotot/ball";
import GamingPagination from "@components/shared/gaming-pagination";
import { LOTTERY_NUMBERS } from "@config/lottery";
import { getTrxHashHistory } from "@data/lottery/trx-hash";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";

type LotteryTrxHashUserHistoryProps = {
  page: number;
  type: string;
};

export default async function LotteryTrxHashUserHistory(props: LotteryTrxHashUserHistoryProps) {
  const t = await getTranslations();
  const history = await getTrxHashHistory(props.page, { type: props.type }).catch((error: unknown) => {
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
      {history.data.map((record) => {
        let color;
        let value = record.selecttype;

        if (!isNaN(parseInt(value))) {
          color = LOTTERY_NUMBERS.find((item) => item.value.toString() === value)!.color;

          //
        } else if (["B", "S"].includes(value)) {
          color = "yellow";

          //
        } else {
          color = value;
          value = "";
        }

        return (
          <div
            // eslint-disable-next-line no-nested-ternary -- -
            className={`flex gap-4 rounded-lg bg-card-confetti bg-full ${record.profit === null ? "bg-blue-500" : record.profit > 0 ? "bg-green-800" : "bg-red-100"} bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white`}
            key={record.id}
          >
            <span className="w-20 text-left">
              {`${dayjs(record.lottery!.updated_at).format("YYYYMMDD")}${record.lottery!.id.toString()}`}
            </span>
            <span className="flex w-28 justify-center">
              <Ball className="-my-0.5 text-2xl" color={color as never} size={rem(20)}>
                {value}
              </Ball>
            </span>

            <span className="flex-1">
              {format(record.amount, {
                style: "decimal",
              })}
            </span>

            <span className="flex-1">
              {record.profit === null
                ? t("Waiting")
                : format(record.profit, {
                    style: "decimal",
                    signDisplay: "always",
                  })}
            </span>
          </div>
        );
      })}

      {history.meta.pagination.total > history.meta.pagination.limit && (
        <GamingPagination {...history.meta.pagination} className="!mt-9 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
