"use server";

import { getTrxHashTime } from "@data/lottery/trx-hash";
import api from "@lib/api";
import { except } from "@lib/error";
import { getSession } from "@lib/session";
import { getLocale } from "@lib/translation";
import { revalidateTag } from "next/cache";

type SubmitResponse = {
  message: string;
};

export async function submit(data: FormData) {
  const lang = getLocale();
  const session = await getSession();
  const { id } = await getTrxHashTime(data.get("typeid") as string);

  data.set("issuenumber", id.toString());

  const payload = new URLSearchParams(Object.fromEntries(data.entries() as never));

  const request = api.post<SubmitResponse>("/trxhash-betting", payload, {
    params: { lang },
  });

  return except(request).then((response) => {
    if ("error" in response) {
      return response;
    }

    revalidateTag(`trx-hash:history#${session.user.id}`);
    revalidateTag(`wallet#${session.user.id}`);
    revalidateTag(`report#${session.user.id}`);

    return response;
  });
}
