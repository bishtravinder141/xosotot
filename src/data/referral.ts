import api from "@lib/api";
import "server-only";

declare interface Referral {
  name: string;
  user_id: number;
  commission: string;
}

declare interface Summary {
  "Total Deposits": number;
  "Referrals Count": number;
  "Total Commissions": number;
}

declare interface ReferralResponse {
  Referrals: {
    "Tier 1"?: Referral[];
    "Tier 1 Summary": Summary;
    "Tier 2"?: Referral[];
    "Tier 2 Summary": Summary;
    "Tier 3"?: Referral[];
    "Tier 3 Summary": Summary;
    "Tier 4"?: Referral[];
    "Tier 4 Summary": Summary;
    "Tier 5"?: Referral[];
    "Tier 5 Summary": Summary;
    "Tier 6"?: Referral[];
    "Tier 6 Summary": Summary;
  };
  "Overall Summary": {
    "Total Deposits": number;
    "Total Commissions": number;
  };
}

export async function getReferrals(tier: number) {
  const response = await api.get<ReferralResponse>("/referrals-tier", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `referrals-tier#${user?.id}`],
        revalidate: /* 5min */ 300,
      };
    },
    params: { tier },
  });

  return {
    id: tier,
    // eslint-disable-next-line -- -
    total: response.Referrals[`Tier ${tier as never} Summary`]["Referrals Count"] as number,

    // eslint-disable-next-line -- -
    deposit: response.Referrals[`Tier ${tier as never} Summary`]["Total Deposits"] as number,

    // eslint-disable-next-line -- -
    referrals: (response.Referrals[`Tier ${tier as never}`] || []) as Referral[],

    // eslint-disable-next-line -- -
    commission: response.Referrals[`Tier ${tier as never} Summary`]["Total Commissions"] as number,
  };
}
