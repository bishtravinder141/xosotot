/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import "server-only";

type TimeResponse = {
  latestWinGoId: number;
  currentDateTime: string;
};

export async function getWinGoTime(type: string) {
  const response = await api.get<TimeResponse>("/game-time", {
    params: { typeId: type },
  });

  return {
    id: response.latestWinGoId,
    date: response.currentDateTime,
  };
}

type Winner = {
  id: number;
  number: number;
};

type WinnerResponse = {
  data: Winner[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getWinGoWinners(type: string, page: number) {
  const { data, total, per_page, current_page } = await api.get<WinnerResponse>("/get-winner-list", {
    next: {
      tags: ["winners", "win-go:winners"],
      revalidate: /* 1min */ 60,
    },
    params: { typeid: type, page },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      result: item.number.toString(),
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
  wingo_id: number;
  transaction_id: number;
  released: number;
  won_amount: number;
  won: number;
  created_at: string;
  updated_at: string;
  wingo: null | {
    id: number;
    number: number;
    color: string;
    premium: number;
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

export async function getWinGoHistory(page: number, params?: LotteryHistoryParams) {
  const { data, total, per_page, current_page } = await api.get<HistoryResponse>("/wingo-history", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `history#${user?.id}`, `win-go:history#${user?.id}`],
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
        lottery: !item.wingo
          ? null
          : {
              id: item.wingo.id,
              result: item.wingo.number.toString(),
              typeid: item.wingo.typeid,
              decided: item.wingo.decided,
              created_at: item.wingo.created_at,
              updated_at: item.wingo.updated_at,
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
