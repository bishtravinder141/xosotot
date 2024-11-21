import { NotificationMessage } from "@components/layout/notification/message";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import dynamic from "next/dynamic";

async function VerificationNotification() {
  const t = await getTranslations();
  const session = await getSession().catch(() => null);

  return !session || session.user.phone_verified_at ? null : (
    <NotificationMessage name="phone_not_verified" title={t("Please verify your phone")} />
  );
}

export default dynamic(() => Promise.resolve(VerificationNotification), {
  loading: () => null,
  ssr: false,
});
