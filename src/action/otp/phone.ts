"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { getSession, setSession } from "@lib/session";
import { getLocale } from "@lib/translation";

type ResetResponse = {
  message: string;
};

export async function reset(data: FormData) {
  const lang = getLocale();
  const session = await getSession().catch(() => {
    const code = data.get("tel-country-code") as string;
    const phone = data.get("tel-national") as string;

    return { user: { phone: phone.startsWith(code) ? phone : code + phone } };
  });

  const payload = {
    phone: session.user.phone,
  };

  const request = api.post<ResetResponse>("/send-otp", payload, {
    params: { lang },
  });

  return except(request);
}

type RegisterResponse = {
  message: string;
};

export async function actualize(data: FormData) {
  const lang = getLocale();
  const session = await getSession();

  const code = data.get("tel-country-code") as string;
  const number = data.get("tel-national") as string;

  data.delete("tel-country-code");
  data.delete("tel-national");

  const phone = number.startsWith(code) ? number : code + number;

  if (session.user.phone !== phone) {
    const payload = new FormData();
    payload.set("phone", phone);

    const response = await except(api.post("/user/update", payload, { params: { lang } }));

    if ("error" in response) {
      return response;
    }

    await setSession({
      user: {
        ...session.user,
        phone,
      },
      token: session.token,
    });
  }

  const payload = new URLSearchParams({
    phone_number: phone.startsWith(code) ? phone : code + phone,
  });

  const request = api.post<RegisterResponse>("/verification/send", payload, {
    params: { lang },
  });

  return except(request);
}
