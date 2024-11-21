import LotterySlotCounter from "@components/lottery/counter/slot";
import { get5DLotreWinners } from "@data/lottery/5d-lotre";
import { UnauthorizedError } from "@lib/error";

type Lottery5DLotreResultCounterProps = {
  type: string;
  period: number;
};

export default async function Lottery5DLotreResultCounter(props: Lottery5DLotreResultCounterProps) {
  const winners = await get5DLotreWinners(props.type, 1).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (winners === null || winners.data.length < 1) {
    return null;
  }

  const { id, result } = winners.data[0];

  return (
    <div className="flex h-24 justify-between overflow-hidden">
      <LotterySlotCounter delay={0} period={props.period} value={parseInt(result[0])} winner={id} />
      <LotterySlotCounter delay={250} period={props.period} value={parseInt(result[1])} winner={id} />
      <LotterySlotCounter delay={500} period={props.period} value={parseInt(result[2])} winner={id} />
      <LotterySlotCounter delay={750} period={props.period} value={parseInt(result[3])} winner={id} />
      <LotterySlotCounter delay={1000} period={props.period} value={parseInt(result[4])} winner={id} />
    </div>
  );
}
