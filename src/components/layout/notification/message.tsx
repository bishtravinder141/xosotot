"use client";

import WarningAlert from "@components/alert/warning";
import useLocalStorage from "@hooks/local-storage";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";

type NotificationMessageProps = {
  name: string;
  title: string;
};

export function NotificationMessage(props: NotificationMessageProps) {
  const t = useTranslations();
  const [state, setState] = useLocalStorage(`notification:${props.name}`);

  useEffect(() => {
    if (state === "hidden") {
      return;
    }

    toast.custom((id) => (
      <WarningAlert actions={[{ url: "/profile/edit/mobile", label: t("Verify") }]} id={id} title={props.title} />
    ));

    setState("hidden");

    // eslint-disable-next-line -- -
  }, []);

  return null;
}
