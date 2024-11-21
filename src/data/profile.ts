/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import "server-only";

export type UserinfoResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    level: number;
    qrcode: string;
    gender: string;
    login_by: string;
    user_type: string;
    real_name: string | null;
    created_at: string;
    updated_at: string;
    profile_picture: string;
    invitation_code: string;
    phone_verified_at: string | null;
    email_verified_at: string | null;
  };
};

export async function getUserinfo() {
  const { user } = await api.get<UserinfoResponse>("/userinfo");
  const { profile_picture, ...info } = user;

  return {
    ...info,
    avatar: profile_picture,
  };
}

export type ReportResponse = {
  profits: number;
  event_gifts: number;
  recharge_amount: number;
  withdraw_amount: number;
  rebate_lower: number;
  rebate_itself: number;
  agent_commission: number;
  deposit_offer: number;
  total_coding: number;
};

export async function getUserReport(period?: string) {
  return api.get<ReportResponse>("/user/report", {
    params: { time_frame: period },

    next(user) {
      return {
        tags: [`user#${user?.id}`, `report#${user?.id}`],
        revalidate: /* 1h */ 3_600,
      };
    },
  });
}
