import LotteryDiceCounter from "@components/lottery/counter/dice";
import { getK3LotreWinners } from "@data/lottery/k3-lotre";
import { UnauthorizedError } from "@lib/error";

type LotteryK3LotreResultCounterProps = {
  type: string;
  period: number;
};

export default async function LotteryK3LotreResultCounter(props: LotteryK3LotreResultCounterProps) {
  const winners = await getK3LotreWinners(props.type, 1).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (winners === null || winners.data.length < 1) {
    return <div className="h-16" />;
  }

  const { id, result } = winners.data[0];

  return (
    <div className="flex h-16 justify-around overflow-hidden">
      <LotteryDiceCounter
        delay={0}
        offset={parseInt(result[1])}
        period={props.period}
        value={parseInt(result[0])}
        winner={id}
      />
      <LotteryDiceCounter
        delay={350}
        offset={parseInt(result[2])}
        period={props.period}
        value={parseInt(result[1])}
        winner={id}
      />
      <LotteryDiceCounter
        delay={700}
        offset={parseInt(result[0])}
        period={props.period}
        value={parseInt(result[2])}
        winner={id}
      />
    </div>
  );
}
