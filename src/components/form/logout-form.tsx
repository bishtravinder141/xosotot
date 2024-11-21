"use client";

import { logout } from "@action/auth";
import useLocalStorage from "@hooks/local-storage";
import type { HTMLAttributes } from "react";

export default function LogoutForm(props: HTMLAttributes<HTMLFormElement>) {
  const [_announcement, setAnnouncement] = useLocalStorage("announcement");
  const [_notification, setNotification] = useLocalStorage("notification:phone_not_verified");

  return <form {...props} action={submit} />;

  function submit() {
    void logout().then(() => {
      setAnnouncement(null);
      setNotification(null);
    });
  }
}
