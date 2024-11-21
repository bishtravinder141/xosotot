"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { setSelectedCryptoWallet } from "@lib/payment/crypto";
import { getSession } from "@lib/session";
import { getLocale } from "@lib/translation";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function add(data: FormData) {
  const lang = getLocale();
  const session = await getSession();

  const payload = {
    wallet_id: data.get("account") as string,
    note: data.get("note") as string,
    cryptocurrency: "USDT",
    network: "TRC",
  };

  const request = api.post("/crypto-wallets", payload, {
    params: { lang },
  });

  return except(request).then((response) => {
    if ("error" in response) {
      return response;
    }

    revalidateTag(`payment:crypto#${session.user.id}`);

    redirect("/wallet/withdraw/crypto", RedirectType.replace);
  });
}

export async function select(data: FormData) {
  setSelectedCryptoWallet(data.get("id") as string | null);

  return void 0;
}
