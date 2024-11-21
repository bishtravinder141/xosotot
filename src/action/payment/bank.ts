"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { setSelectedBank } from "@lib/payment/bank";
import { getSession } from "@lib/session";
import { getLocale } from "@lib/translation";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function add(data: FormData) {
  const lang = getLocale();
  const session = await getSession();

  const payload = {
    full_name: data.get("holder") as string,
    bank_account: data.get("account") as string,
    phone_number: data.get("phone") as string,
    mail: data.get("email") as string,
    branch: data.get("branch") as string,
    bank_name: data.get("bank") as string,
  };

  const request = api.post("/user-banks", payload, {
    params: { lang },
  });

  return except(request).then((response) => {
    if ("error" in response) {
      return response;
    }

    revalidateTag(`payment:bank#${session.user.id}`);

    redirect("/wallet/withdraw/banks", RedirectType.replace);
  });
}

export async function select(data: FormData) {
  setSelectedBank(data.get("id") as string | null);

  return void 0;
}
