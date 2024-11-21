/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import "server-only";

type TimeResponse = {
  latestTRXId: number;
  currentDateTime: string;
};

export async function getTrxHashTime(type: string) {
  const response = await api.get<TimeResponse>("/trx-game-time", {
    params: { typeId: type },
  });

  return {
    id: response.latestTRXId,
    date: response.currentDateTime,
  };
}

type Winner = {
  id: number;
  number: number;
  colour: string;
  block_id: string;
  block_number: number;
};

type WinnerResponse = {
  data: Winner[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getTrxHashWinners(type: string, page: number) {
  const { data, total, per_page, current_page } = await api.get<WinnerResponse>("/get-trx-winner-list", {
    next: {
      tags: ["winners", "trx-hash:winners"],
      revalidate: /* 1min */ 60,
    },
    params: { typeid: type, page },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      block: {
        id: item.block_id,
        number: item.block_number,
      },
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
  trx_hash_game_id: number;
  user_id: number;
  amount: number;
  betcount: number;
  gametype: number;
  selecttype: string;
  typeid: number;
  transaction_id: null;
  released: number;
  won_amount: number;
  won: number;
  created_at: string;
  updated_at: string;
  trx_hash_game: null | {
    id: number;
    number: string | null;
    colour: string;
    premium: string;
    block_id: string;
    block_number: number;
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

export async function getTrxHashHistory(page: number, params?: LotteryHistoryParams) {
  const { data, total, per_page, current_page } = await api.get<HistoryResponse>("/trx-history", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `history#${user?.id}`, `trx-hash:history#${user?.id}`],
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
        lottery:
          item.trx_hash_game === null
            ? null
            : {
                id: item.trx_hash_game.id,
                block: {
                  id: item.trx_hash_game.block_id,
                  number: item.trx_hash_game.block_number,
                },
                result: item.trx_hash_game.number?.toString() ?? null,
                typeid: item.trx_hash_game.typeid,
                decided: item.trx_hash_game.decided,
                created_at: item.trx_hash_game.created_at,
                updated_at: item.trx_hash_game.updated_at,
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
