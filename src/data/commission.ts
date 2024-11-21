/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import { capitalize } from "@lib/string";
import "server-only";

type Commission = {
  id: number;
  name: string;
  tier_1: string;
  tier_2: string;
  tier_3: string;
  tier_4: string;
  tier_5: string;
  tier_6: string;
  created_at: string;
  updated_at: string;
  level: number;
  total_referral: number;
  total_bet: number;
  recharge: string;
};

export async function getCommissions() {
  const response = await api.get<Commission[]>("/commissions", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `commissions#${user?.id}`],
        revalidate: /* 5min */ 300,
      };
    },
  });

  return response.map((item) => ({
    ...item,
    recharge: parseFloat(item.recharge),
  }));
}

type CommissionSummaryResponse = {
  Team: number;
  Direct: number;
  Yesterday: number;
};

export async function getCommissionSummary() {
  const response = await api.get<CommissionSummaryResponse>("/commission-summary", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `commission-summary#${user?.id}`],
        revalidate: /* 5min */ 300,
      };
    },
  });

  return {
    team: response.Team,
    direct: response.Direct,
    yesterday: response.Yesterday,
  };
}

type CommissionTransaction = {
  id: number;
  user_id: number;
  referral_id: number;
  tier: number;
  amount: string;
  type: string;
  game_name: null;
  game_id: null;
  transaction_id: null;
  created_at: string;
  updated_at: string;
};

type HistoryResponse = {
  data: CommissionTransaction[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getCommissionHistory(page: number) {
  const { data, total, per_page, current_page } = await api.get<HistoryResponse>("/commissions_history", {
    params: { page },
    // next(user) {
    //   return {
    //     tags: [`user#${user?.id}`, `commission-history#${user?.id}`],
    //     revalidate: /* 5min */ 300,
    //   };
    // },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      type: capitalize(item.type),
      amount: parseFloat(item.amount),
      created_at: item.created_at,
      updated_at: item.updated_at,
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
