import Card from "@components/icon/ion/card";
import Cash from "@components/icon/ion/cash";
import { LotteryProvider } from "@components/primitive/lottery";
import Skeleton from "@components/shared/skeleton";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import type { PropsWithChildren, ReactElement } from "react";
import { Suspense } from "react";

type LotteryLayoutProps = PropsWithChildren<{
  breadcrumbs: ReactElement;
  records: ReactElement;
}>;

export default async function LotteryLayout(props: LotteryLayoutProps) {
  const t = await getTranslations();

  return (
    <>
      <UserTokenValidator />

      {props.breadcrumbs}

      <div className="space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="flex items-center gap-2">
          <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
        </div>

        <Suspense fallback={<Skeleton className="h-10 rounded-md" />}>
          <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
            <WalletBalance />
          </div>
        </Suspense>

        <div className="flex gap-3 text-xs font-bold tracking-wide text-white">
          <NextLink className="inline-flex w-0 grow gap-3 rounded-lg bg-blue-500 p-3" href="/wallet/withdraw">
            {t("Withdraw")}
            <Cash className="ml-auto" size={rem(14)} />
          </NextLink>
          <NextLink className="inline-flex w-0 grow gap-3 rounded-lg bg-blue-500 p-3" href="/wallet/recharge">
            {t("Recharge")}
            <Card className="ml-auto" size={rem(14)} />
          </NextLink>
        </div>
      </div>

      <LotteryProvider>{props.children}</LotteryProvider>

      {props.records}
    </>
  );
}
