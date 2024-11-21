"use client";

import DangerAlert from "@components/alert/danger";
import useLocalStorage from "@hooks/local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type AutoLogoutProps = {
  message: string;
};

export default function AutoLogout(props: AutoLogoutProps) {
  const router = useRouter();
  const replaced = useRef(false);
  const [_announcement, setAnnouncement] = useLocalStorage("announcement");
  const [_notification, setNotification] = useLocalStorage("notification:phone_not_verified");

  useEffect(() => {
    if (replaced.current) {
      return;
    }

    replaced.current = true;

    setAnnouncement(null);
    setNotification(null);
    toast.custom((id) => <DangerAlert id={id} title={props.message} />);
    router.replace("/logout");

    // eslint-disable-next-line -- -
  }, []);

  return null;
}
