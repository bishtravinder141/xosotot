"use server";

import { getVietnamLotteryAreas, getVietnamLotteryCities, getVietnamLotteryIssue } from "@data/lottery/vietnam-lottery";
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

  const $area = data.get("area") as string | undefined;
  data.delete("area");

  const area = await getVietnamLotteryAreas().then((areas) => {
    return areas.find((item) => !$area || item.id.toString() === $area)!;
  });

  const $city = data.get("city") as string | undefined;
  data.delete("city");

  const city = await getVietnamLotteryCities(area.id).then((cities) => {
    return cities.find((item) => !$city || item.id.toString() === $city)!;
  });

  const issue = await getVietnamLotteryIssue(area.id, city.id, city.date);

  data.set("duplex", "0");
  data.set("typeid", city.type_id.toString());
  data.set("areacode", city.code.toString());
  data.set("issuenumber", issue.id.toString());

  const payload = new URLSearchParams(Object.fromEntries(data.entries() as never));

  const request = api.post<SubmitResponse>("/vietnam-lottery-betting", payload, {
    params: { lang },
  });

  return except(request).then((response) => {
    if ("error" in response) {
      return response;
    }

    revalidateTag(`vietnam-lottery:history#${session.user.id}`);
    revalidateTag(`wallet#${session.user.id}`);
    revalidateTag(`report#${session.user.id}`);

    return response;
  });
}
