import LogoutForm from "@components/form/logout-form";
import TransactionsOutline from "@components/icon/bitcoin/transactions-outline";
import ChevronRight from "@components/icon/custom/chevron-right";
import Clock from "@components/icon/custom/clock";
import Crown from "@components/icon/custom/crown";
import Verified from "@components/icon/custom/verified";
import InfoFilled from "@components/icon/epi/info-filled";
import FeedbackIcon from "@components/icon/feedback/feedback";
import BaselineLock from "@components/icon/ic/baseline-lock";
import Card from "@components/icon/ion/card";
import Cash from "@components/icon/ion/cash";
import QuestionFill from "@components/icon/mingcute/question-fill";
import CustomerService2Fill from "@components/icon/ri/customer-service-2-fill";
import ProfileAdvance from "@components/profile/advance";
import ButtonLink from "@components/shared/button-link";
import Skeleton from "@components/shared/skeleton";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import { getUserMembership } from "@data/membership";
import { UnauthorizedError } from "@lib/error";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";
import NextLink from "next/link";
import { Suspense } from "react";

export default async function ProfilePage() {
  const t = await getTranslations();
  const { user } = await getSession();
  const membership = await getUserMembership().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <UserTokenValidator />

      <NextLink className="flex justify-between gap-2.5 rounded-lg bg-blue-100 p-2.5 text-white" href="/profile/edit">
        <NextImage alt={user.name} className="rounded-full object-cover" height={60} src={user.avatar} width={60} />

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-blue-500">{user.name}</span>
            <Verified className={user.phone_verified_at ? "text-green-800" : "text-gray-300"} size={rem(14)} />
          </div>

          <div className="mt-1.5 flex gap-0.5 self-start rounded-full bg-tacao-300 px-2 py-1">
            <ProfileAdvance className="shrink-0" level={membership?.level ?? 0} size={14} />
            <span className="text-[0.625rem] text-red-300">{`Vip ${membership?.level ?? 0}`}</span>
          </div>
        </div>

        <ChevronRight className="ml-auto size-9 self-center rounded-full bg-white p-3 text-blue-500" size={rem(8)} />
      </NextLink>

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

      <NextLink
        className="flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-br from-punch-600 to-apricot-300 p-2.5 text-xs font-bold leading-5 text-white"
        href="/profile/vip"
      >
        VIP
        <Crown size="1.35em" />
      </NextLink>

      <ButtonLink href="/profile/reports">
        <TransactionsOutline className="my-0.5" size={rem(16)} />
        {t("Report")}
      </ButtonLink>

      <div className="space-y-2.5">
        <h2 className="text-xs font-bold text-blue-500">{t("History")}</h2>

        <ButtonLink href="/profile/history">
          <Clock className="my-0.5" size={rem(16)} />
          {t("Bet record")}
        </ButtonLink>
      </div>

      <div className="space-y-2.5">
        <h2 className="text-xs font-bold text-blue-500">{t("Settings")}</h2>

        <ButtonLink href="/profile/reset">
          <BaselineLock className="my-0.5" size={rem(16)} />
          {t("Account Security")}
        </ButtonLink>
        <ButtonLink href="/tutorial">
          <QuestionFill className="my-0.5" size={rem(16)} />
          {t("Beginner Tutorial")}
        </ButtonLink>
        <ButtonLink href="/about">
          <InfoFilled className="my-0.5" size={rem(16)} />
          {t("About")}
        </ButtonLink>
        <ButtonLink href="/customer">
          <CustomerService2Fill className="my-0.5" size={rem(16)} />
          {t("Customer Service")}
        </ButtonLink>
      </div>

      <ButtonLink href="/profile/feedback">
        <FeedbackIcon className="my-0.5" size={rem(16)} />
        {t("Feedback")}
      </ButtonLink>

      <LogoutForm className="flex flex-col">
        <SubmitButton className="rounded-lg bg-red-300 p-3 text-sm font-bold text-white">{t("Logout")}</SubmitButton>
      </LogoutForm>
    </>
  );
}
