import Ball from "@components/icon/xosotot/ball";
import LotteryBetLoseResult from "@components/lottery/bet/lose-result";
import LotteryBetWinResult from "@components/lottery/bet/win-result";
import { LOTTERY_COLORS, LOTTERY_NUMBERS } from "@config/lottery";
import { getWinGoHistory, getWinGoWinners } from "@data/lottery/win-go";
import { UnauthorizedError } from "@lib/error";
import { getLotteryWonLost } from "@lib/lottery";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";

type LotteryWinGoResultPopupProps = {
  type: string;
};

export default async function LotteryWinGoResultPopup(props: LotteryWinGoResultPopupProps) {
  const t = await getTranslations();
  const [winners, history] = await Promise.all([
    //
    getWinGoWinners(props.type, 1).catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
    getWinGoHistory(1, { type: props.type }).catch((error: unknown) => {
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
  const number = LOTTERY_NUMBERS.find((item) => item.value === winner.result);
  const colors = LOTTERY_COLORS.filter((item) => number?.color.includes(item.value));

  const latest = history.data.filter((item) => item.lottery?.id === winner.id);
  const [won, lost] = getLotteryWonLost(latest);

  if (number && won > 0) {
    return (
      <LotteryBetWinResult amount={won} id={winner.id} key={winner.id} prefix="win-go">
        <p className="rounded bg-white px-4 py-1 text-xs leading-6 text-green-900">
          {colors.map((item) => t(item.name)).join(", ")}
        </p>
        <Ball color={number.color as never} size={rem(28)}>
          {number.value}
        </Ball>
        <p className="rounded bg-white px-4 py-1 text-xs leading-6 text-green-900">
          {t(parseInt(number.value) > 4 ? "Big" : "Small")}
        </p>
      </LotteryBetWinResult>
    );
  }

  if (number && lost > 0) {
    return (
      <LotteryBetLoseResult id={winner.id} key={winner.id} prefix="win-go">
        <p className="rounded bg-white px-4 py-1 text-xs leading-6 text-green-900">
          {colors.map((item) => t(item.name)).join(", ")}
        </p>
        <Ball color={number.color as never} size={rem(28)}>
          {number.value}
        </Ball>
        <p className="rounded bg-white px-4 py-1 text-xs leading-6 text-green-900">
          {t(parseInt(number.value) > 4 ? "Big" : "Small")}
        </p>
      </LotteryBetLoseResult>
    );
  }

  return null;
}
