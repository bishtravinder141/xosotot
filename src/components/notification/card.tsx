"use client";

import MailFilled from "@components/icon/tabler/mail-filled";
import dayjs from "@lib/dayjs";
import { rem } from "@lib/utils";

type NotificationCardProps = {
  id: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export default function NotificationCard(props: NotificationCardProps) {
  return (
    <div className="rounded-xl bg-red-50 p-4">
      <header className="mb-3 flex gap-2.5">
        <MailFilled className="text-red-300" size={rem(20)} />

        <strong className="flex-1 truncate text-sm">{props.title}</strong>
      </header>

      <p className="whitespace-break-spaces text-xs">{props.message}</p>

      <footer className="mt-4 text-[0.5rem]">
        <time>{dayjs(props.updated_at).toDateTimeString()}</time>
      </footer>
    </div>
  );
}
