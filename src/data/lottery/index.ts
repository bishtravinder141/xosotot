import { get5DLotreHistory } from "@data/lottery/5d-lotre";
import { getK3LotreHistory } from "@data/lottery/k3-lotre";
import { getTrxHashHistory } from "@data/lottery/trx-hash";
import { getVietnamLotteryHistory } from "@data/lottery/vietnam-lottery";
import { getWinGoHistory } from "@data/lottery/win-go";
import api from "@lib/api";
import "server-only";

const lotteries = [
  //
  "win-go",
  "trx-hash",
  "5d-lotre",
  "k3-lotre",
];

type Winner = {
  user_name: string;
  won_amount: number;
  avatar: string;
};

export async function getLotteryWinners(type: number) {
  const winners = await api.get<Winner[]>("/games-winners", {
    next: {
      tags: ["winners", `${lotteries[type % lotteries.length]}:winners`],
      revalidate: /* 1min */ 60,
    },
    params: { game: type },
  });

  return winners.map((winner) => ({
    name: winner.user_name,
    amount: winner.won_amount,
    avatar: winner.avatar,
  }));
}

type LotteryHistoryParams = {
  type?: string;
  date?: string;
};

export async function getLotteryHistory(page: number, lottery: number, params?: LotteryHistoryParams) {
  if (lottery === 1) {
    return getWinGoHistory(page, params);
  }

  if (lottery === 2) {
    return getTrxHashHistory(page, params);
  }

  if (lottery === 3) {
    return get5DLotreHistory(page, params);
  }

  if (lottery === 4) {
    return getK3LotreHistory(page, params);
  }

  if (lottery === 5) {
    return getVietnamLotteryHistory(page, params);
  }

  throw new Error(`Invalid lottery "${lottery}"`);
}
