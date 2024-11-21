import api from "@lib/api";
import "server-only";

type Withdrawal = {
  id: number;
  amount: string;
  created_at: string;
  updated_at: string;
  user_balance: {
    user: {
      id: number;
      name: string;
      profile_picture: string;
    };
  };
};

export async function getTopWithdrawals() {
  const withdrawals = await api.get<Withdrawal[]>("/top-win-transactions", {
    next: { revalidate: /* 5min */ 300 },
  });

  return withdrawals.map((withdrawal) => ({
    id: withdrawal.id,
    user: {
      id: withdrawal.user_balance.user.id,
      name: withdrawal.user_balance.user.name,
      avatar: withdrawal.user_balance.user.profile_picture,
    },
    amount: withdrawal.amount,
    updated_at: withdrawal.updated_at,
  }));
}

type Winner = {
  id: number;
  username: string;
  amount: number;
  game: string;
  profile_picture: string;
};

export async function getLatestWithdrawalWinners() {
  const response = await api.get<Winner[]>("/latest-winners", {
    next: { revalidate: /* 5min */ 300 },
  });

  return response.map((item) => ({
    id: item.id,
    name: item.username,
    amount: item.amount,
    game: item.game,
    avatar: item.profile_picture,
  }));
}
