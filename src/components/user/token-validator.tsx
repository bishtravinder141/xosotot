import AutoLogout from "@components/plugin/auto-logout";
import { getUserinfo } from "@data/profile";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import dynamic from "next/dynamic";

async function UserTokenValidator() {
  const t = await getTranslations();
  const userinfo = await getUserinfo().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return userinfo === null ? <AutoLogout message={t("You are logged in from another device")} /> : null;
}

export default dynamic(() => Promise.resolve(UserTokenValidator), {
  loading: () => null,
  ssr: false,
});
