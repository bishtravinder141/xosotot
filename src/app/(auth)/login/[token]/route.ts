import type { UserinfoResponse } from "@data/profile";
import { request as requestBase } from "@lib/request";
import { setSession } from "@lib/session";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type LoginContext = {
  params: {
    token: string;
  };
};

export async function GET(_request: NextRequest, context: LoginContext) {
  const { user } = await requestBase<UserinfoResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/userinfo`,
    "get",
    null,
    {
      headers: {
        Authorization: `Bearer ${context.params.token}`,
      },
    },
  );

  await setSession({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      qrcode: user.qrcode,
      avatar: user.profile_picture,
      login_by: user.login_by,
      real_name: user.real_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      invitation_code: user.invitation_code,
      email_verified_at: user.email_verified_at,
      phone_verified_at: user.phone_verified_at,
    },
    token: context.params.token,
  });

  revalidateTag(`user#${user.id}`);

  // Ensure redirect URL is correct for production
  const redirectUrl = new URL("/", "https://xosotot.com");

  return NextResponse.redirect(redirectUrl);
}
