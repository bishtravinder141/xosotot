/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import { capitalize } from "@lib/string";
import "server-only";

type Transaction = {
  id: number;
  user_balance_id: number;
  recharge_id: null;
  transaction_type: string;
  amount: number;
  created_at: string;
  updated_at: string;
};

type TransactionsResponse = {
  transactions: {
    data: Transaction[];
    total: number;
    per_page: number;
    current_page: number;
  };
};

export async function getTransactions(page: number, type?: string) {
  const {
    transactions: { data, total, per_page, current_page },
  } = await api.get<TransactionsResponse>("/user/transaction-list", {
    params: { type, page },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      amount: item.amount,
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

type Recharge = {
  id: number;
  user_id: number;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type TopUpRequest = {
  id: number;
  user_id: number;
  account_holder_name: string | null;
  bank_code: string | null;
  account_number: string | null;
  amount: string;
  submitted_at: string;
  status: string;
  reason: string | null;
  created_at: string;
  updated_at: string;
  payment_method: string;
  wallet_address: null;
};

type RechargeResponse = {
  topupRequests: TopUpRequest[];
  rechargeTransactions: Recharge[];
};

export async function getRechargeTransactions() {
  const { topupRequests, rechargeTransactions } = await api.get<RechargeResponse>("/rechargeRecord", {
    // next(user) {
    //   return {
    //     tags: [`user#${user?.id}`, `recharge#${user?.id}`],
    //     revalidate: /* 5min */ 300,
    //   };
    // },
  });

  const recharges = topupRequests.map((item) => ({
    id: item.id,
    amount: parseFloat(item.amount),
    status: capitalize(item.status),
    message: null,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  for (const item of rechargeTransactions) {
    recharges.push({
      id: item.id,
      amount: parseFloat(item.amount),
      status: capitalize(item.status),
      message: null,
      created_at: item.created_at,
      updated_at: item.updated_at,
    });
  }

  return {
    data: recharges,
    meta: {
      pagination: {
        page: 1,
        total: recharges.length,
        limit: recharges.length,
      },
    },
  };
}

type Withdrawal = {
  id: number;
  user_id: number;
  user_balance_id: number;
  bank_user_id: number;
  crypto_wallet_id: number | null;
  transaction_id: number | null;
  amount: number;
  status: string;
  message: string | null;
  type: string;
  created_at: string;
  updated_at: string;
};

type WithdrawalResponse = {
  data: Withdrawal[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getWithdrawalTransactions() {
  const { data, total, per_page, current_page } = await api.get<WithdrawalResponse>("/withdraw-requests", {
    // next(user) {
    //   return {
    //     tags: [`user#${user?.id}`, `withdraw#${user?.id}`],
    //     revalidate: /* 5min */ 300,
    //   };
    // },
  });

  return {
    data: data.map((item) => ({
      id: item.id,
      amount: item.amount,
      status: capitalize(item.status),
      message: item.message,
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
