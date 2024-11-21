"use server";

import api from "@lib/api";
import { except } from "@lib/error";
import { getSession, setSession } from "@lib/session";
import { getLocale } from "@lib/translation";
import { redirect } from "next/navigation";

type RegisterResponse = {
  message: string;
};

// Define the expected shape of the response data
type VerifyEmailResponse = {
  message: string;
  email: string;
  error?: string;
};

export async function actualize(data: FormData) {
  const lang = getLocale();

  const email = data.get("email") as string;

  const payload = {
    new_email: email,
  };

  const request = api.post<RegisterResponse>("/request-email-change", payload, {
    params: { lang },
  });

  return except(request);
}

export async function verify(data: FormData) {
  const lang = getLocale();
  const session = await getSession();

  const payload = {
    verification_code: data.get("verification_code") as string,
  };

  const request = api.post<VerifyEmailResponse>("/verify-email-change", payload, {
    params: { lang },
  });

  return except(request).then(async (response) => {
    if ("error" in response) {
      return response;
    }

    await setSession({
      user: {
        ...session.user,
        email: response.email,
      },
      token: session.token,
    });

    redirect("/profile/edit");
  });
}
