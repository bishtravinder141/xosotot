import api from "@lib/api";
import "server-only";

export type Advertisement = {
  id: number;
  title: string;
  link: string;
  type: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type WithdrawSettingsResponse = {
  min_amount: string;
  max_amount: string;
  bet: string;
  per_day: string;
  can_withdraw: boolean;
  remaining: number;
  withdraw_today: number;
};

export async function getWithdrawSettings() {
  const response = await api.get<WithdrawSettingsResponse>("/withdraw-settings");

  return {
    bet: response.bet,
    amount: {
      min: parseFloat(response.min_amount),
      max: parseFloat(response.max_amount),
    },
    remaining: response.remaining,
    can_withdraw: response.can_withdraw,
    withdraw_today: response.withdraw_today,
  };
}
