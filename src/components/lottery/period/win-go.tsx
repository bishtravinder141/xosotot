import { getWinGoTime } from "@data/lottery/win-go";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";

type LotteryWinGoPeriodProps = {
  type: string;
};

export default async function LotteryWinGoPeriod(props: LotteryWinGoPeriodProps) {
  const lottery = await getWinGoTime(props.type).catch((error: unknown) => {
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
