import notebook from "@assets/images/general/notebook.png";
import GamingPagination from "@components/shared/gaming-pagination";
import { getK3LotreHistory } from "@data/lottery/k3-lotre";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type LotteryK3LotreUserHistoryProps = {
  page: number;
  type: string;
};

export default async function LotteryK3LotreUserHistory(props: LotteryK3LotreUserHistoryProps) {
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
      {history.data.map((record) => {
        return (
          <div
            // eslint-disable-next-line no-nested-ternary -- -
            className={`flex gap-4 rounded-lg bg-card-confetti bg-full ${record.profit === null ? "bg-blue-500" : record.profit > 0 ? "bg-green-800" : "bg-red-100"} bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white`}
            key={record.id}
          >
            <span className="w-20 text-left">
              {`${dayjs(record.lottery!.updated_at).format("YYYYMMDD")}${record.lottery!.id.toString()}`}
            </span>
            <span className="flex w-48 justify-center">{record.selecttype}</span>

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
