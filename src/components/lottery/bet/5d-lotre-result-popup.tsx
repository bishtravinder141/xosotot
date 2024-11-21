import Ball from "@components/icon/xosotot/ball";
import LotteryBetLoseResult from "@components/lottery/bet/lose-result";
import LotteryBetWinResult from "@components/lottery/bet/win-result";
import { get5DLotreHistory, get5DLotreWinners } from "@data/lottery/5d-lotre";
import { UnauthorizedError } from "@lib/error";
import { getLotteryWonLost } from "@lib/lottery";
import { rem } from "@lib/utils";

type Lottery5DLotreResultPopupProps = {
  type: string;
};

export default async function Lottery5DLotreResultPopup(props: Lottery5DLotreResultPopupProps) {
  const [winners, history] = await Promise.all([
    //
    get5DLotreWinners(props.type, 1).catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
    get5DLotreHistory(1, { type: props.type }).catch((error: unknown) => {
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
      <LotteryBetWinResult amount={won} id={winner.id} key={winner.id} prefix="5d-lotre">
        {winner.result.split("").map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Ball color="black" key={value + index} size={rem(28)}>
            {value}
          </Ball>
        ))}
      </LotteryBetWinResult>
    );
  }

  if (lost > 0) {
    return (
      <LotteryBetLoseResult id={winner.id} key={winner.id} prefix="5d-lotre">
        {winner.result.split("").map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Ball color="black" key={value + index} size={rem(28)}>
            {value}
          </Ball>
        ))}
      </LotteryBetLoseResult>
    );
  }

  return null;
}
