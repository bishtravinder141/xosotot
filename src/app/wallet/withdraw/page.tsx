import { withdraw } from "@action/transaction";
import Usdt from "@components/icon/cryptocurrency/usdt";
import Plus from "@components/icon/custom/plus";
import Card from "@components/icon/ion/card";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import Skeleton from "@components/shared/skeleton";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import WithdrawForm from "@components/wallet/withdraw/form";
import WithdrawInfo from "@components/wallet/withdraw/info";
import WithdrawSubmitButton from "@components/wallet/withdraw/submit-button";
import { getUserBanks, getUserCryptoWallets } from "@data/payment";
import { getWithdrawSettings } from "@data/settings";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getSelectedBank } from "@lib/payment/bank";
import { getSelectedCryptoWallet } from "@lib/payment/crypto";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import { Suspense } from "react";

export default async function WithdrawPage() {
  const t = await getTranslations();
  const session = await getSession();

  const banks = await getUserBanks().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });
  const wallets = await getUserCryptoWallets().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  const selectedBank = getSelectedBank();
  const bank = banks?.find((item) => item.id.toString() === selectedBank) ?? null;

  const selectedWallet = getSelectedCryptoWallet();
  const wallet = wallets?.find((item) => item.id.toString() === selectedWallet) ?? null;

  const settings = await getWithdrawSettings().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <UserTokenValidator />

      <WithdrawForm
        action={withdraw}
        active={settings?.can_withdraw}
        className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500"
      >
        <div className="flex items-center gap-2">
          <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
        </div>

        <Suspense fallback={<Skeleton className="h-10 rounded-md" />}>
          <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
            <WalletBalance />
          </div>
        </Suspense>

        <TabsProvider initial="bank">
          <div className="flex gap-3 text-xs font-bold tracking-wide">
            <TabsTrigger
              className="inline-flex w-0 grow gap-1.5 rounded-lg px-2.5 py-3 text-blue-500 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              value="bank"
            >
              {t("Bank Card")}
              <Card className="ml-auto" size={rem(14)} />
            </TabsTrigger>
            <TabsTrigger
              className="inline-flex w-0 grow gap-1.5 rounded-lg px-2.5 py-3 text-blue-500 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              value="crypto"
            >
              USDT
              <Usdt className="ml-auto" size={rem(14)} />
            </TabsTrigger>
          </div>

          <label className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5">
            <span className="text-sm font-bold">
              {format(0, { style: "currency", fractionDigits: 0 }).replaceAll(/\d|\s/g, "")}
            </span>
            <input
              className="w-full text-xs text-black"
              inputMode="numeric"
              max={settings?.amount.max}
              min={settings?.amount.min}
              name="amount"
              placeholder={t("Please Enter the Withdrawal Amount")}
              required
              type="number"
            />
          </label>

          <h2 className="text-sm font-bold">{t("Payout")}</h2>

          <TabsContent value="bank">
            <input name="type" type="hidden" value="bank" />
            <input name="bank_user_id" type="hidden" value={bank?.id} />

            {banks && banks.length > 0 && (
              <NextLink
                className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                href="/wallet/withdraw/banks"
              >
                <Card className="my-1 text-blue-500" size={rem(12)} />
                {bank?.bank_account || t("Select")}
              </NextLink>
            )}

            <NextLink
              className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5 text-xs text-black"
              href="/wallet/withdraw/banks/add"
            >
              <Plus className="my-1 text-blue-500" size={rem(12)} />
              {t("Add card")}
            </NextLink>
          </TabsContent>

          <TabsContent value="crypto">
            <input name="type" type="hidden" value="crypto" />
            <input name="crypto_wallet_id" type="hidden" value={wallet?.id} />

            {wallets && wallets.length > 0 && (
              <NextLink
                className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                href="/wallet/withdraw/crypto"
              >
                <Card className="my-1 truncate text-blue-500" size={rem(12)} />
                {wallet?.wallet_id || t("Select")}
              </NextLink>
            )}

            <NextLink
              className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5 text-xs text-black"
              href="/wallet/withdraw/crypto/add"
            >
              <Plus className="my-1 text-blue-500" size={rem(12)} />
              {t("Add USDT")}
            </NextLink>
          </TabsContent>

          <WithdrawSubmitButton
            className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white"
            verified={session.user.phone_verified_at !== null}
          />
        </TabsProvider>
      </WithdrawForm>

      <div className="space-y-4 rounded-lg bg-blue-100 px-2.5 py-4 text-[0.625rem] leading-none text-black">
        <WithdrawInfo position={1}>
          {t.rich("Need to bet <mark>{value}</mark> to be able to withdraw", {
            // eslint-disable-next-line react/no-unstable-nested-components -- -
            mark: (chunks) => <mark className="bg-transparent font-medium text-red-300">{chunks}</mark>,
            value: settings?.remaining.toLocaleString("en", {
              style: "currency",
              currency: "VND",
            }),
          })}
        </WithdrawInfo>

        <hr className="border-blue-500" />

        <WithdrawInfo position={2}>
          {t.rich("Withdraw Time <mark>00:05</mark> - <mark>23:55</mark>", {
            // eslint-disable-next-line react/no-unstable-nested-components -- -
            mark: (chunks) => <mark className="bg-transparent font-medium text-red-300">{chunks}</mark>,
          })}
        </WithdrawInfo>

        <hr className="border-blue-500" />

        <WithdrawInfo position={3}>
          {t.rich("In day Remaining Withdrawal Times <mark>{value}</mark>", {
            // eslint-disable-next-line react/no-unstable-nested-components -- -
            mark: (chunks) => <mark className="bg-transparent font-medium text-red-300">{chunks}</mark>,
            value: settings?.withdraw_today,
          })}
        </WithdrawInfo>

        <hr className="border-blue-500" />

        <WithdrawInfo position={4}>
          {t.rich("Withdrawal amount range <mark>{min}</mark> - <mark>{max}</mark>", {
            min: settings?.amount.min.toLocaleString("en", {
              style: "currency",
              currency: "VND",
            }),
            max: settings?.amount.max.toLocaleString("en", {
              style: "currency",
              currency: "VND",
            }),
            // eslint-disable-next-line react/no-unstable-nested-components -- -
            mark: (chunks) => <mark className="bg-transparent font-medium text-red-300">{chunks}</mark>,
          })}
        </WithdrawInfo>

        <hr className="border-blue-500" />

        <WithdrawInfo position={5}>
          {`${t("Please confirm your beneficial account information before withdrawing")}. ${t("If your information is incorrect, our company will not be liable for the amount of loss")}.`}
        </WithdrawInfo>

        <hr className="border-blue-500" />

        <WithdrawInfo position={6}>
          {t("If your beneficial information is incorrect, please contact customer service")}
        </WithdrawInfo>
      </div>
    </>
  );
}
