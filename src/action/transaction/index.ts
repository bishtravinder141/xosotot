"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { getSession } from "@lib/session";
import { getLocale } from "@lib/translation";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type WithdrawResponse = {
  message: string;
};

export async function withdraw(data: FormData) {
  const lang = getLocale();
  const session = await getSession();

  const payload = Object.fromEntries(data.entries());

  const request = api.post<WithdrawResponse>("/withdraw-requests", payload, {
    params: { lang },
  });

  return except(request).then((response) => {
    if (!("error" in response)) {
      revalidateTag(`withdraw#${session.user.id}`);
      revalidateTag(`wallet#${session.user.id}`);
    }

    return response;
  });
}

type RechargeResponse = {
  payUrl: string | undefined;
};

type RechargeNewResponse = {
  data: {
    redirectUrl: string | undefined
  }
};

type RechargeCryptoResponse = {
  url: string;
};

export async function recharge(data: FormData) {
  const lang = getLocale();
  const session = await getSession();

  const type = data.get("type") as string;
  data.delete("type");

  if (type === "manual") {
    data.set("user_id", session.user.id.toString());

    const method = data.get("method") as string;

    data.delete("method");
    data.set("payment_method", method);

    const payload = Object.fromEntries(data.entries() as never);

    const request = api.post<RechargeResponse>("/topup-requests", payload, {
      params: { lang },
    });

    return except(request).then((response) => {
      if ("error" in response) {
        return response;
      }

      revalidateTag(`recharge#${session.user.id}`);
      revalidateTag(`wallet#${session.user.id}`);
      redirect(response.payUrl ?? "/wallet");
    });
  }

  if (type === "crypto") {
    const payload = Object.fromEntries(data.entries() as never);

    const request = api.post<RechargeCryptoResponse>("/crypto-pay", payload, {
      params: { lang },
    });

    return except(request).then((response) => {
      if ("error" in response) {
        return response;
      }

      revalidateTag(`recharge#${session.user.id}`);
      revalidateTag(`wallet#${session.user.id}`);
      redirect(response.url);
    });
  }

  if (type === "v8momo" || type === "v8bank" || type === "QR" || type === "v8zalo") {

    data.delete("method");
    data.set("amount", data.get("amount") as string);
    const typeToSend = type.replace("v8", "");
    data.set("paytype", typeToSend);

    const payload = Object.fromEntries(data.entries() as never);

    const request = api.post<RechargeNewResponse>("/redirect-to-v8pay-checkout", payload, {
      params: { lang },
    });

    return except(request).then((response) => {
      if ("error" in response) {
        return response;
      }

      revalidateTag(`recharge#${session.user.id}`);
      revalidateTag(`wallet#${session.user.id}`);
      redirect(response.data.redirectUrl ?? "/wallet");
    });
  }


  const payload = new URLSearchParams({
    amount: data.get("amount") as string,
    paytype: type,
  });

  const request = api.post<RechargeResponse>("/vnd-payment", payload, {
    params: { lang },
  });

  return except(request).then((response) => {
    if ("error" in response) {
      return response;
    }

    revalidateTag(`recharge#${session.user.id}`);
    revalidateTag(`wallet#${session.user.id}`);
    redirect(response.payUrl ?? "/wallet");
  });
}
