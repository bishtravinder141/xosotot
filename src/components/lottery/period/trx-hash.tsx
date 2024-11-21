import { getTrxHashTime } from "@data/lottery/trx-hash";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";

type LotteryTrxHashPeriodProps = {
  type: string;
};

export default async function LotteryTrxHashPeriod(props: LotteryTrxHashPeriodProps) {
  const lottery = await getTrxHashTime(props.type).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (lottery === null) {
    return null;
  }

  return <span className="w-20 whitespace-nowrap text-right">{`${dayjs().format("YYYYMMDD")}${lottery.id}`}</span>;
}
