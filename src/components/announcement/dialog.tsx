"use client";

import NotificationDialog from "@components/dialog/notification";
import useLocalStorage from "@hooks/local-storage";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type AnnouncementDialogProps = {
  children: string;
};

export default function AnnouncementDialog(props: AnnouncementDialogProps) {
  const t = useTranslations();
  const [show, setShow] = useState(false);
  const [announcement, setAnnouncement] = useLocalStorage("announcement");

  useEffect(() => {
    setShow(announcement !== "hidden");
  }, [announcement]);

  return (
    <NotificationDialog onClose={setAnnouncement.bind(0, "hidden")} show={show} title={t("Notification")}>
      <div
        className="max-h-[65vh] space-y-3 overflow-y-auto whitespace-pre-wrap px-6 py-3 text-xs [&_h1]:text-center [&_h1]:text-base [&_h1]:font-bold"
        dangerouslySetInnerHTML={{ __html: props.children }}
      />

      <div className="p-6 pb-3">
        <button
          className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]"
          onClick={setAnnouncement.bind(0, "hidden")}
          type="button"
        >
          {t("Confirm")}
        </button>
      </div>
    </NotificationDialog>
  );
}
