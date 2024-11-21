import LotteryBetLoseResult from "@components/lottery/bet/lose-result";
import LotteryBetWinResult from "@components/lottery/bet/win-result";
import LotteryDice from "@components/lottery/k3/dice";
import { getK3LotreHistory, getK3LotreWinners } from "@data/lottery/k3-lotre";
import { UnauthorizedError } from "@lib/error";
import { getLotteryWonLost } from "@lib/lottery";

type LotteryK3LotreResultPopupProps = {
  type: string;
};

export default async function LotteryK3LotreResultPopup(props: LotteryK3LotreResultPopupProps) {
  const [winners, history] = await Promise.all([
    //
    getK3LotreWinners(props.type, 1).catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
    getK3LotreHistory(1, { type: props.type }).catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
  ]);

  if (winners === null || history === null || winners.data.length < 1) {
    return null;
  }

  const winner = winners.data[0];

  const latest = history.data.filter((item) => item.lottery?.id === winner.id);
  const [won, lost] = getLotteryWonLost(latest);

  if (won > 0) {
    return (
      <LotteryBetWinResult amount={won} id={winner.id} key={winner.id} prefix="k3-lotre">
        {winner.result.split("").map((value, index, list) => (
          <LotteryDice
            className="-my-1.5 size-7 shrink-0"
            // eslint-disable-next-line react/no-array-index-key -- -
            key={value + index}
            offset={parseInt(list[(index + 1) % list.length])}
            size={7}
            value={parseInt(value)}
          />
        ))}
      </LotteryBetWinResult>
    );
  }

  if (lost > 0) {
    return (
      <LotteryBetLoseResult id={winner.id} key={winner.id} prefix="k3-lotre">
        {winner.result.split("").map((value, index, list) => (
          <LotteryDice
            className="-my-1.5 size-7 shrink-0"
            // eslint-disable-next-line react/no-array-index-key -- -
            key={value + index}
            offset={parseInt(list[(index + 1) % list.length])}
            size={7}
            value={parseInt(value)}
          />
        ))}
      </LotteryBetLoseResult>
    );
  }

  return null;
}
