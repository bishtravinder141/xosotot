"use client";

import Diamond from "@components/icon/custom/diamond";
import Account from "@components/icon/mdi/account";
import Game2Fill from "@components/icon/mingcute/game-2-fill";
import FireFill from "@components/icon/ri/fire-fill";
import RankingBold from "@components/icon/solar/ranking-bold";
import BottomAppBarLink from "@components/layout/bottom-appbar/link";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";

export default function BottomAppbar() {
  const t = useTranslations();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-appbar">
      <div className="absolute inset-0 flex">
        <div className="-mr-[2.1rem] grow rounded-tr-3xl bg-red-200" />
        <div className="relative -z-[1] flex w-32 flex-col overflow-hidden">
          <div className="-mx-8 h-4 bg-white" />
          <div className="grow bg-red-200" />
        </div>
        <div className="-ml-[2.1rem] grow rounded-tl-3xl bg-red-200" />
      </div>
      <nav className="container relative flex pt-3 text-white pb-safe-offset-2 px-safe-offset-5">
        <BottomAppBarLink as="/" href="/lotteries" label={t("Game")}>
          <Game2Fill size={rem(20)} />
        </BottomAppBarLink>
        <BottomAppBarLink href="/activity" label={t("Activity")}>
          <FireFill size={rem(20)} />
        </BottomAppBarLink>
        <BottomAppBarLink className="w-8" href="/share" label={t("Share")}>
          <span className="-mb-3 flex h-8 w-full items-end justify-center rounded-b-xl">
            <span className="mb-2.5 rounded-full border-[6px] border-white bg-red-200 p-3 text-white">
              <Diamond size={rem(38)} />
            </span>
          </span>
        </BottomAppBarLink>
        <BottomAppBarLink href="/wallet" label={t("Total")}>
          <RankingBold size={rem(20)} />
        </BottomAppBarLink>
        <BottomAppBarLink href="/profile" label={t("My")}>
          <Account size={rem(20)} />
        </BottomAppBarLink>
      </nav>
    </footer>
  );
}
