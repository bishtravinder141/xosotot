import api from "@lib/api";
import "server-only";

type WalletResponse = {
  current_balance: string;
  latest_withdraw_transaction: string | null;
  todays_withdraw_transactions: string | null;
};

export async function getWallet() {
  const response = await api.get<WalletResponse>("/wallet", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `wallet#${user?.id}`],
        revalidate: /* 5min */ 300,
      };
    },
  });

  return {
    balance: parseFloat(response.current_balance),
    withdrawal: {
      today: parseFloat(response.todays_withdraw_transactions || "0"),
      latest: parseFloat(response.latest_withdraw_transaction || "0"),
    },
  };
}
