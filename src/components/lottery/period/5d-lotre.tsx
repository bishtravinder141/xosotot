import { get5DLotreTime } from "@data/lottery/5d-lotre";
import dayjs from "@lib/dayjs";
import { UnauthorizedError } from "@lib/error";

type Lottery5DLotrePeriodProps = {
  type: string;
};

export default async function Lottery5DLotrePeriod(props: Lottery5DLotrePeriodProps) {
  const lottery = await get5DLotreTime(props.type).catch((error: unknown) => {
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
