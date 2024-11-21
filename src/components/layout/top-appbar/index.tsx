"use client";

import BellNotification from "@components/icon/mdi/bell-notification";
import LocaleDropdown from "@components/layout/top-appbar/locale-dropdown";
import SoundToggle from "@components/layout/top-appbar/sound-toggle";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import type { PropsWithChildren } from "react";

type TopAppbarProps = PropsWithChildren<{
  sound?: boolean;
  anonymous?: boolean;
}>;

export default function TopAppbar(props: TopAppbarProps) {
  const t = useTranslations();

  return (
    <header className="fixed inset-x-0 top-0 z-appbar bg-red-200 pb-3 text-white shadow px-safe pt-safe-or-3">
      <nav className="gap container flex gap-2.5">
        {props.children}

        <div className="ml-auto flex gap-2.5 py-2">
          <LocaleDropdown />
          {props.sound && <SoundToggle />}
          <NextLink className="rounded-full bg-red-200" href="/notifications">
            <BellNotification size={rem(20)} />
          </NextLink>
        </div>

        {props.anonymous && (
          <NextLink
            className="min-w-20 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-center text-sm font-bold text-red-200"
            href="/login"
          >
            {t("Log In")}
          </NextLink>
        )}
      </nav>
    </header>
  );
}
