import api from "@lib/api";
import "server-only";

type BankResponse = {
  id: number;
  bonus: number;
  account_holder_name: string;
  bank_code: string;
  account_number: string;
  created_at: string;
  updated_at: string;
  payment_method: string;
};

export async function getBankDetails() {
  return api.get<BankResponse>("/mybank", { params: { type: "bank" } }).catch(() => null);
}

type CryptoResponse = {
  id: number;
  bonus: number;
  network: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
  payment_method: string;
};

export async function getCryptoDetails() {
  return api.get<CryptoResponse>("/mybank", { params: { type: "crypto" } }).catch(() => null);
}

type Bank = {
  id: number;
  full_name: string;
  bank_name: string;
  bank_account: string;
  phone_number: string;
  mail: string;
  branch: string;
  created_at: string;
  updated_at: string;
};

export async function getUserBanks() {
  return api.get<Bank[]>("/user-banks", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `payment:bank#${user?.id}`],
      };
    },
  });
}

type Wallet = {
  id: number;
  wallet_id: string;
  note: string;
  cryptocurrency: string;
  network: string;
  created_at: string;
  updated_at: string;
};

export async function getUserCryptoWallets() {
  return api.get<Wallet[]>("/crypto-wallets", {
    next(user) {
      return {
        tags: [`user#${user?.id}`, `payment:crypto#${user?.id}`],
      };
    },
  });
}

type PaymentChannel = {
  id: number;
  name: string;
  bonus: string;
  enabled: number;
  image: string;
  created_at: string;
  updated_at: string;
};

export async function getPaymentChannels() {
  const channels = await api.get<PaymentChannel[]>("/payment-channels").catch(() => []);

  return channels.map((channel) => ({
    id: channel.id,
    name: channel.name,
    bonus: channel.bonus,
    image: channel.image,
    disabled: channel.enabled === 0,
    created_at: channel.created_at,
    updated_at: channel.updated_at,
  }));
}
