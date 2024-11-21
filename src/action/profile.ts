"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { getSession, setSession } from "@lib/session";
import { getLocale } from "@lib/translation";
import { redirect } from "next/navigation";

type UpdateResponse = {
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
  message: string;
};

export async function update(data: FormData) {
  const lang = getLocale();
  const { token } = await getSession();

  const avatar = data.get("avatar") as File | undefined;

  if (avatar && avatar.size > 0) {
    data.set("profile_picture", avatar);
  }

  const request = api.post<UpdateResponse>("/user/update", data, {
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
      token,
    });

    redirect("/profile/edit");
  });
}

export async function verify(data: FormData) {
  const lang = getLocale();

  const payload = new URLSearchParams({
    verification_code: data.get("verification_code") as string,
  });

  const request = api.post("/verify-phone-number", payload, {
    params: { lang },
  });

  return except(request).then(async (response) => {
    if ("error" in response) {
      return response;
    }

    redirect("/profile/edit");
  });
}

export async function feedback(data: FormData) {
  const lang = getLocale();

  const feedBack = data.get("feedback") as string;

  const payload = {
    text: feedBack,
  };

  const request = api.post("/feedback", payload, {
    params: { lang },
  });

  return except(request).then(async (response) => {
    if ("error" in response) {
      return response;
    }
    redirect("/profile");
  });
}
