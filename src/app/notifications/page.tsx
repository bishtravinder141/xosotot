import notebook from "@assets/images/general/notebook.png";
import NotificationCard from "@components/notification/card";
import Pagination from "@components/shared/pagination";
import { getAnnouncements } from "@data/announcement";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type NotificationsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function NotificationsPage(props: NotificationsPageProps) {
  const page = parseInt(props.searchParams.page ?? "1");

  const t = await getTranslations();

  const announcements = await getAnnouncements(page).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (announcements === null || announcements.data.length < 1) {
    return (
      <div className="flex flex-col items-center gap-3 py-3">
        <NextImage alt="Notebook" className="max-w-24" src={notebook} />
        <p className="text-[0.625rem]">{t("No data available")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2.5">
        {announcements.data.map((notification) => (
          <NotificationCard {...notification} key={notification.id} />
        ))}
      </div>

      {announcements.meta.pagination.total > announcements.meta.pagination.limit && (
        <Pagination {...announcements.meta.pagination} className="flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
