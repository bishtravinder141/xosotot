/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import "server-only";

type TimeResponse = {
  latestK3Id: number;
  currentDateTime: string;
};

export async function getK3LotreTime(type: string) {
  const response = await api.get<TimeResponse>("/k3-game-time", {
    params: { typeId: type },
  });

  return {
    id: response.latestK3Id,
    date: response.currentDateTime,
  };
}

type Winner = {
  id: number;
  Premium: string;
  sumCount: number;
};

type WinnerResponse = {
  data: Winner[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getK3LotreWinners(type: string, page: number) {
  const { data, total, per_page, current_page } = await api.get<WinnerResponse>("/get-k3-winner-list", {
    next: {
      tags: ["winners", "k3-lotre:winners"],
      revalidate: /* 1min */ 60,
    },
    params: { typeid: type, page },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      sum: item.sumCount,
      result: item.Premium,
    })),
    meta: {
      pagination: {
        page: current_page,
        total,
        limit: per_page,
      },
    },
  };
}

type Bet = {
  id: number;
  user_id: number;
  amount: number;
  betcount: number;
  gametype: number;
  selecttype: string;
  typeid: number;
  transaction_id: number;
  released: number;
  won_amount: number;
  won: number;
  created_at: string;
  updated_at: string;
  game: null | {
    id: number;
    Premium: string;
    sumCount: number;
    typeid: number;
    decided: number;
    created_at: string;
    updated_at: string;
  };
};

type HistoryResponse = {
  data: Bet[];
  total: number;
  per_page: number;
  current_page: number;
};

type LotteryHistoryParams = {
  type?: string;
  date?: string;
};

export async function getK3LotreHistory(page: number, params?: LotteryHistoryParams) {
  const { data, total, per_page, current_page } = await api.get<HistoryResponse>("/k3-history", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `history#${user?.id}`, `k3-lotre:history#${user?.id}`],
        revalidate: /* 1min */ 60,
      };
    },
    params: { typeid: params?.type, page, date: params?.date },
  });

  return {
    data: data.map((item) => {
      let amount: number | null = null;

      if (item.released) {
        amount = item.won === 1 ? item.won_amount : -item.amount;
      }

      return {
        id: item.id,
        amount: item.amount,
        profit: amount,
        betcount: item.betcount,
        gametype: item.gametype,
        selecttype: item.selecttype,
        typeid: item.typeid,
        created_at: item.created_at,
        updated_at: item.updated_at,
        lottery: !item.game
          ? null
          : {
              id: item.game.id,
              sum: item.game.sumCount,
              result: item.game.Premium,
              typeid: item.game.typeid,
              decided: item.game.decided,
              created_at: item.game.created_at,
              updated_at: item.game.updated_at,
            },
      };
    }),
    meta: {
      pagination: {
        page: current_page,
        total,
        limit: per_page,
      },
    },
  };
}
