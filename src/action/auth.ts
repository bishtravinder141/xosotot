"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { deleteSession, getSession, setSession } from "@lib/session";
import { getLocale, getTranslations } from "@lib/translation";
import { revalidateTag } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    level: number;
    gender: string;
    qrcode: string;
    login_by: string;
    user_type: string;
    real_name: string | null;
    created_at: string;
    updated_at: string;
    profile_picture: string;
    invitation_code: string;
    phone_verified_at: string | null;
    email_verified_at: string | null;
    verification_code: string | null;
  };
  access_token: string;
};

export async function login(data: FormData) {
  const lang = getLocale();

  const code = data.get("tel-country-code") as string;
  const phone = data.get("tel-national") as string;

  const payload = new URLSearchParams({
    phone: phone.startsWith(code) ? phone : code + phone,
    password: data.get("password") as string,
  });

  const request = api.post<LoginResponse>("/login", payload, {
    params: { lang },
  });

  return except(request).then(async (response) => {
    if ("error" in response) {
      return response;
    }

    await setSession({
      user: {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phone: response.user.phone,
        gender: response.user.gender,
        qrcode: response.user.qrcode,
        avatar: response.user.profile_picture,
        login_by: response.user.login_by,
        real_name: response.user.real_name,
        created_at: response.user.created_at,
        updated_at: response.user.updated_at,
        invitation_code: response.user.invitation_code,
        email_verified_at: response.user.email_verified_at,
        phone_verified_at: response.user.phone_verified_at,
      },
      token: response.access_token,
    });

    revalidateTag(`user#${response.user.id}`);
    redirect("/", RedirectType.replace);
  });
}

type ResetPasswordResponse = {
  message: string;
};

export async function reset(data: FormData) {
  const lang = getLocale();
  const t = await getTranslations();
  const session = await getSession().catch(() => null);

  if (session?.user.phone) {
    data.set("phone", session.user.phone);
  }

  data.set("otp", data.get("code") as string);
  data.delete("code");

  if (data.get("password") !== data.get("repeat-password")) {
    return { error: t("Invalid password") };
  }

  const request = api.post<ResetPasswordResponse>("/reset-password", data, {
    params: { lang },
  });

  return except(request);
}

export async function forgot(data: FormData) {
  const lang = getLocale();
  const t = await getTranslations();

  const code = data.get("tel-country-code") as string;
  const phone = data.get("tel-national") as string;

  data.set("phone", phone.startsWith(code) ? phone : code + phone);
  data.delete("tel-country-code");
  data.delete("tel-national");

  data.set("otp", data.get("code") as string);
  data.delete("code");

  if (data.get("password") !== data.get("repeat-password")) {
    return { error: t("Invalid password") };
  }

  const request = api.post("/reset-password", data, {
    params: { lang },
  });

  return except(request).then(() => {
    data.set("tel-country-code", code);
    data.set("tel-national", phone);

    return login(data);
  });
}

export async function logout() {
  deleteSession();

  redirect("/");
}

export async function register(data: FormData) {
  const lang = getLocale();
  const t = await getTranslations();

  const code = data.get("tel-country-code") as string;
  const phone = data.get("tel-national") as string;
  const password = data.get("password") as string;

  if (password !== data.get("repeat-password")) {
    return { error: t("Invalid password") };
  }

  const payload = new URLSearchParams({
    inv: (data.get("ref") as string | null) ?? "",
    password,
    phone_number: phone.startsWith(code) ? phone : code + phone,
  });

  const request = api.post("/register", payload, {
    params: { lang },
  });

  return except(request).then(() => login(data));
}
