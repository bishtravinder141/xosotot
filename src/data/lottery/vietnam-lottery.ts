/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import { getLocale } from "@lib/translation";
import "server-only";

type Area = {
  TypeID: number;
  TypeName: string;
};

export async function getVietnamLotteryAreas() {
  const response = await api.get<Area[]>("/get-vietnam-list");

  return response.map((item) => ({
    id: item.TypeID,
    name: item.TypeName,
  }));
}

type City = {
  id: number;
  type_id: number;
  day: string;
  week: string;
  name: string;
  code: number;
  open: number;
  created_at: null;
  updated_at: null;
};

export async function getVietnamLotteryCities(area: number) {
  const payload = {
    typeid: area,
  };

  const response = await api.post<City[]>("/get-day-list", payload);

  return response
    .filter((item) => item.open === 1)
    .map((item) => ({
      id: item.code,
      name: item.name,
      date: item.day,
      code: item.code,
      type_id: item.type_id,
    }));
}

type TimeResponse = {
  Result: string;
  draw_time: string;
  IssueNumber: number;
};

export async function getVietnamLotteryIssue(area: number, city: number, date: string) {
  const payload = {
    areacode: city,
    typeid: area,
    date,
  };

  const response = await api.post<TimeResponse>("/getVietnamIssue", payload);

  return {
    id: response.IssueNumber,
    result: response.Result,
    expired: response.draw_time,
  };
}

type Winner = {
  id: number;
  type_id: number;
  code: number;
  Result: number;
  decided: number;
  draw: string;
  created_at: null;
  updated_at: null;
  calculated_field: number;
  all_results_ranks: string;
  region: {
    id: number;
    TypeName: string;
    open: number;
    created_at: string;
    updated_at: string;
  };
  city: {
    id: number;
    type_id: number;
    day: string;
    week: string;
    name: string;
    code: string;
    open: number;
    created_at: null;
    updated_at: null;
  };
};

type WinnerResponse = {
  data: Winner[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getVietnamLotteryWinners(area: number, city: string, page: number) {
  const payload = {
    city_name: city,
    language: getLocale(),
    typeid: area,
    page,
  };

  const { data, total, per_page, current_page } = await api.post<WinnerResponse>("/get-vietnam-emerd-list", payload, {
    next: {
      tags: ["winners", "vietnam-lottery:winners"],
      revalidate: /* 1min */ 60,
    },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      city: {
        id: item.city.code,
        name: item.city.name,
        date: item.city.day,
        code: item.city.code,
        type_id: item.city.type_id,
      },
      ranks: JSON.parse(item.all_results_ranks) as Record<"special_prize" | `result_${number}`, number[]>,
      result: item.Result.toString().padStart(5, "0"),
      region: {
        id: item.region.id,
        name: item.region.TypeName,
      },
      created_at: item.draw,
      updated_at: item.draw,
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
  amount: string;
  betcount: number;
  duplex: number;
  betcontent: string;
  typeid: number;
  bettype: number;
  areacode: number;
  date: string;
  issuenumber: string;
  released: number;
  won_amount: string;
  won: number;
  created_at: string;
  updated_at: string;
  game: {
    id: number;
    type_id: number;
    code: number;
    Result: string;
    decided: number;
    draw: string;
    created_at: null;
    updated_at: null;
    all_results_ranks: string;
    region: {
      id: number;
      TypeName: string;
      open: number;
      created_at: string;
      updated_at: string;
    };
    city: {
      id: number;
      type_id: number;
      day: string;
      week: string;
      name: string;
      code: string;
      open: number;
      created_at: null;
      updated_at: null;
    };
  };
};

type HistoryResponse = {
  data: Bet[];
  total: number;
  per_page: number;
  current_page: number;
};

type LotteryHistoryParams = {
  date?: string;
};

export async function getVietnamLotteryHistory(page: number, params?: LotteryHistoryParams) {
  const { data, total, per_page, current_page } = await api.get<HistoryResponse>("/vietnam-lottery-betting", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `history#${user?.id}`, `vietnam-lottery:history#${user?.id}`],
        revalidate: /* 1min */ 60,
      };
    },
    params: { page, date: params?.date },
  });

  return {
    data: data.map((item) => {
      let amount: number | null = null;

      if (item.released) {
        amount = item.won === 1 ? parseFloat(item.won_amount) : -parseFloat(item.amount);
      }

      return {
        id: item.id,
        amount: parseFloat(item.amount),
        profit: amount,
        betcount: item.betcount,
        gametype: item.bettype,
        selecttype: item.betcontent,
        typeid: item.typeid,
        lottery: {
          id: item.game.id,
          city: {
            id: item.game.city.code,
            name: item.game.city.name,
            date: item.game.city.day,
            code: item.game.city.code,
            type_id: item.game.city.type_id,
          },
          ranks: JSON.parse(item.game.all_results_ranks) as Record<"special_prize" | `result_${number}`, number[]>,
          result: item.game.Result,
          region: {
            id: item.game.region.id,
            name: item.game.region.TypeName,
          },
          created_at: item.game.draw,
          updated_at: item.game.draw,
        },
        created_at: item.created_at,
        updated_at: item.updated_at,
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
