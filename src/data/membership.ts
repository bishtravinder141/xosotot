/* eslint camelcase: "off" -- - */

import api from "@lib/api";
import "server-only";

export type Membership = {
  id: number;
  level_name: string;
  exp_from: number;
  exp_to: number;
  level_up_reward: string;
  month_reward: string;
  safe: number;
  rebate_rate: string;
  created_at: null;
  updated_at: null;
};

type UserMembershipResponse = {
  user_membership: {
    id: number;
    user_id: number;
    membership_id: number;
    exp: number;
    created_at: string;
    updated_at: string;
    membership: Membership;
  };
  membership_details: Membership;
};

export async function getUserMembership() {
  const response = await api.get<UserMembershipResponse>("/user-membership");

  return {
    level: parseInt(response.user_membership.membership.level_name.replace(/\D+/, "")),
    ...response.user_membership,
  };
}

type Experience = {
  id: number;
  user_id: number;
  amount: number;
  exp: number;
  created_at: string;
  updated_at: string;
};

type HistoryResponse = {
  data: Experience[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getExperienceHistory(page: number) {
  const { data, total, per_page, current_page } = await api.get<HistoryResponse>("/experience-history", {
    params: { page },
  });

  return {
    data,
    meta: {
      pagination: {
        page: current_page,
        total,
        limit: per_page,
      },
    },
  };
}

type MembershipDetailsResponse = {
  payout: number;
  memberships: Membership[];
};

export async function getMembershipDetails() {
  const { memberships, payout } = await api.get<MembershipDetailsResponse>("/membership-details");

  return {
    payout,
    memberships: memberships.map((item) => ({
      level: parseInt(item.level_name.replace(/\D+/, "")),
      ...item,
    })),
  };
}
