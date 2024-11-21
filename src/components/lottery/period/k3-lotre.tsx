import { getK3LotreTime } from "@data/lottery/k3-lotre";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";

type LotteryK3LotrePeriodProps = {
  type: string;
};

export default async function LotteryK3LotrePeriod(props: LotteryK3LotrePeriodProps) {
  const lottery = await getK3LotreTime(props.type).catch((error: unknown) => {
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
