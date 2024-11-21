import ChevronDown from "@components/icon/custom/chevron-down";
import Card from "@components/icon/ion/card";
import Cash from "@components/icon/ion/cash";
import { Accordion, AccordionContent, AccordionTrigger } from "@components/primitive/accordion";
import Skeleton from "@components/shared/skeleton";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import WalletTodayWithdrawal from "@components/wallet/today-withdrawal";
import WalletTotalWithdrawal from "@components/wallet/total-withdrawal";
import WalletRechargeTransactions from "@components/wallet/transaction/recharge";
import WalletTransactionsSkeleton from "@components/wallet/transaction/skeleton";
import WalletWithdrawalTransactions from "@components/wallet/transaction/withdrawal";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import { Suspense } from "react";

export default async function WalletPage() {
  const t = await getTranslations();

  return (
    <>
      <UserTokenValidator />

      <div className="space-y-4 rounded-lg bg-blue-100 p-3 text-blue-500">
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

      <div className="flex gap-4">
        <div className="w-0 grow space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
          <div className="flex items-center gap-2">
            <span className="mr-auto text-xs font-bold">{t("History Withdrawal")}</span>
          </div>

          <Suspense fallback={<Skeleton className="h-8 rounded-md" />}>
            <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
              <WalletTotalWithdrawal />
            </div>
          </Suspense>
        </div>

        <div className="w-0 grow space-y-2.5 rounded-lg bg-blue-100 p-3 text-blue-500">
          <div className="flex items-center gap-2">
            <span className="mr-auto text-xs font-bold">{t("Today Withdrawal")}</span>
          </div>

          <Suspense fallback={<Skeleton className="h-8 rounded-md" />}>
            <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
              <WalletTodayWithdrawal />
            </div>
          </Suspense>
        </div>
      </div>

      <Accordion className="group rounded-lg bg-blue-500 p-4 text-white">
        <h2 className="text-xs font-bold">
          <AccordionTrigger className="flex items-center gap-3">
            {t("Recharge Record")}
            <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
          </AccordionTrigger>
        </h2>

        <AccordionContent>
          <Suspense fallback={<WalletTransactionsSkeleton />}>
            <WalletRechargeTransactions />
          </Suspense>
        </AccordionContent>
      </Accordion>

      <Accordion className="group rounded-lg bg-blue-500 p-4 text-white">
        <h2 className="text-xs font-bold">
          <AccordionTrigger className="flex items-center gap-3">
            {t("Withdraw Record")}
            <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
          </AccordionTrigger>
        </h2>

        <AccordionContent>
          <Suspense fallback={<WalletTransactionsSkeleton />}>
            <WalletWithdrawalTransactions />
          </Suspense>
        </AccordionContent>
      </Accordion>
    </>
  );
}
