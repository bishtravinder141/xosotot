import VolumeFill from "@components/icon/mingcute/volume-fill";
import Ticker from "@components/notification/ticker";
import { getAnnouncements } from "@data/announcement";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";

export default async function NotificationPage() {
  const t = await getTranslations();

  const notifications = await getAnnouncements(1);

  return notifications.data.length < 1 ? null : (
    <div className="container -mb-1.5 -mt-0.5 flex items-center gap-2.5 rounded-md bg-yellow-100 py-1.5">
      <VolumeFill className="text-christine-500" size={rem(20)} />

      <Ticker className="flex-1">{notifications.data.map((notification) => notification.message)}</Ticker>

      <NextLink className="rounded-full bg-red-200 px-2.5 py-1 text-xs font-medium text-white" href="/notifications">
        {t("Details")}
      </NextLink>
    </div>
  );
}
