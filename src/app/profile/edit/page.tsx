import Google from "@components/icon/custom/google";
import Telegram from "@components/icon/custom/telegram";
import Verified from "@components/icon/custom/verified";
import PenBold from "@components/icon/solar/pen-bold";
import UserTokenValidator from "@components/user/token-validator";
import { GENDERS } from "@config/profile";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function EditProfilePage() {
  const t = await getTranslations();
  const { user } = await getSession();

  const gender = GENDERS.find((item) => item.code === user.gender);

  return (
    <>
      <UserTokenValidator />

      <div className="space-y-2.5 text-xs text-blue-500">
        <NextLink className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5" href="/profile/edit/avatar">
          <span className="mr-auto font-bold leading-9">{t("Profile Photo")}</span>

          <NextImage
            alt="Avatar"
            className="size-9 rounded-full object-cover"
            height={36}
            src={user.avatar}
            width={36}
          />
          <PenBold size={rem(16)} />
        </NextLink>

        <div className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5">
          <span className="mr-auto font-bold leading-9">ID</span>

          <span className="text-[0.625rem] text-black">{user.id}</span>
        </div>

        <NextLink className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5" href="/profile/edit/nickname">
          <span className="mr-auto font-bold leading-9">{t("Nickname")}</span>

          <span className="text-[0.625rem] text-black">{user.name}</span>
          <PenBold size={rem(16)} />
        </NextLink>

        <NextLink className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5" href="/profile/edit/gender">
          <span className="mr-auto font-bold leading-9">{t("Gender")}</span>

          {gender && <span className="text-[0.625rem] text-black">{t(gender.name)}</span>}
          <PenBold size={rem(16)} />
        </NextLink>

        {user.email_verified_at ? (
          <div className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5">
            <span className="mr-auto font-bold leading-9">Email</span>

            <span className="text-[0.625rem] text-black">{user.email}</span>
            <Verified className="text-green-800" size={rem(16)} />
          </div>
        ) : (
          <NextLink className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5" href="/profile/edit/email">
            <span className="mr-auto font-bold leading-9">Email</span>

            <span className="text-[0.625rem] text-black">{user.email}</span>
            <PenBold size={rem(16)} />
          </NextLink>
        )}

        {user.phone_verified_at ? (
          <div className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5">
            <span className="mr-auto font-bold leading-9">{t("Mobile")}</span>

            <span className="text-[0.625rem] text-black">{user.phone}</span>
            <Verified className="text-green-800" size={rem(16)} />
          </div>
        ) : (
          <NextLink className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5" href="/profile/edit/mobile">
            <span className="mr-auto font-bold leading-9">{t("Mobile")}</span>

            <span className="text-[0.625rem] text-black">{user.phone}</span>
            <PenBold size={rem(16)} />
          </NextLink>
        )}
      </div>

      <div className="flex items-center justify-center gap-2.5 text-xs">
        <span>{`${t("User login by")} ${user.login_by}`}</span>

        {user.login_by === "google" && <Google size={rem(20)} />}
        {user.login_by === "telegram" && <Telegram size={rem(20)} />}
      </div>
    </>
  );
}
