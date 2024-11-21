import { recharge } from "@action/transaction";
import Form from "@components/form/form";
import InfoFilled from "@components/icon/epi/info-filled";
import Card from "@components/icon/ion/card";
import Bonus from "@components/icon/xosotot/bonus";
import ClipboardField from "@components/primitive/clipboard-field";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import Skeleton from "@components/shared/skeleton";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import WalletRechargeAmount from "@components/wallet/recharge/amount";
import { TRANSACTION_AMOUNTS } from "@config/transaction";
import { getBankDetails, getCryptoDetails, getPaymentChannels } from "@data/payment";
import { format } from "@lib/format";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import { cva } from "class-variance-authority";
import NextImage from "next/image";
import { Suspense } from "react";

const triggers = cva("grid gap-3 text-xs font-bold tracking-wide", {
  variants: {
    bank: { true: "" },
    crypto: { true: "" },
  },
  compoundVariants: [
    { bank: true, crypto: true, className: "grid-cols-2" },
    { bank: true, crypto: false, className: "grid-cols-3" },
    { bank: false, crypto: true, className: "grid-cols-3" },
    { bank: false, crypto: false, className: "grid-cols-2" },
  ],
});

export default async function RechargePage() {
  const t = await getTranslations();
  const { user } = await getSession();

  const [bank, crypto, channels] = await Promise.all([getBankDetails(), getCryptoDetails(), getPaymentChannels()]);

  const getChannel = (id: number) => channels.find((channel) => channel.id === id && !channel.disabled);

  const vnd = getChannel(1);
  const usdt = getChannel(4);
  const momo = getChannel(2);
  const zolopay = getChannel(3);
  const qr = getChannel(6);
  const v8Bank = getChannel(5);
  const v8Momo = getChannel(7);
  const v8Zalopay = getChannel(8);

  let initialMethod = channels.find((item) => !item.disabled)?.id.toString();

  if (!initialMethod && bank) {
    initialMethod = "manual bank";
  }

  if (!initialMethod && crypto) {
    initialMethod = "manual crypto";
  }

  return (
    <>
      <UserTokenValidator />

      <Form action={recharge} className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="flex items-center gap-2">
          <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
        </div>

        <Suspense fallback={<Skeleton className="h-10 rounded-md" />}>
          <div className="flex items-center gap-1 rounded-md bg-white px-2 py-2.5">
            <WalletBalance />
          </div>
        </Suspense>

        <TabsProvider initial={initialMethod}>
          <div className={triggers({ bank: Boolean(bank), crypto: Boolean(crypto) })}>
            {vnd && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={vnd.id.toString()}
              >
                <NextImage
                  alt={vnd.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={vnd.image}
                  width={40}
                />
                {vnd.name}

                {vnd.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(vnd.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {usdt && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={usdt.id.toString()}
              >
                <NextImage
                  alt={usdt.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={usdt.image}
                  width={40}
                />
                {usdt.name}

                {usdt.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(usdt.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {momo && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={momo.id.toString()}
              >
                <NextImage
                  alt={momo.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={momo.image}
                  width={40}
                />
                {momo.name}

                {momo.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(momo.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {zolopay && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={zolopay.id.toString()}
              >
                <NextImage
                  alt={zolopay.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={zolopay.image}
                  width={40}
                />
                {zolopay.name}

                {zolopay.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(zolopay.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {bank && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value="manual bank"
              >
                <Card className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                {t("Bank Transfer")}

                {bank.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(bank.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {crypto && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value="manual crypto"
              >
                <Card className="rounded-full bg-white p-2.5 text-blue-500" size={rem(40)} />
                {t("USDT Transfer")}

                {crypto.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(crypto.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {qr && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={qr.id.toString()}
              >
                <NextImage
                  alt={qr.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={qr.image}
                  width={40}
                />
                {qr.name}

                {qr.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(qr.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {v8Momo && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={v8Momo.id.toString()}
              >
                <NextImage
                  alt={v8Momo.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={v8Momo.image}
                  width={40}
                />
                {v8Momo.name}

                {v8Momo.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(v8Momo.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {v8Bank && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={v8Bank.id.toString()}
              >
                <NextImage
                  alt={v8Bank.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={v8Bank.image}
                  width={40}
                />
                {v8Bank.name}

                {v8Bank.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(v8Bank.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}

            {v8Zalopay && (
              <TabsTrigger
                className="relative flex flex-col items-center gap-1 rounded-lg p-2 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
                value={v8Zalopay.id.toString()}
              >
                <NextImage
                  alt={v8Zalopay.name}
                  className="aspect-square h-auto w-10"
                  height={40}
                  src={v8Zalopay.image}
                  width={40}
                />
                {v8Zalopay.name}

                {v8Zalopay.bonus ? (
                  <Bonus className="absolute -top-px right-1.5">
                    {format(v8Zalopay.bonus, {
                      style: "percent",
                      signDisplay: "always",
                      fractionDigits: 0,
                    })}
                  </Bonus>
                ) : ""}
              </TabsTrigger>
            )}
          </div>

          {vnd && (
            <TabsContent value={vnd.id.toString()}>
              <input name="type" type="hidden" value="vnd" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {usdt && (
            <TabsContent value={usdt.id.toString()}>
              <input name="type" type="hidden" value="crypto" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(1)} />
            </TabsContent>
          )}

          {momo && (
            <TabsContent value={momo.id.toString()}>
              <input name="type" type="hidden" value="momo" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {zolopay && (
            <TabsContent value={zolopay.id.toString()}>
              <input name="type" type="hidden" value="zalopay" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {qr && (
            <TabsContent value={qr.id.toString()}>
              <input name="type" type="hidden" value="QR" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {v8Momo && (
            <TabsContent value={v8Momo.id.toString()}>
              <input name="type" type="hidden" value="v8momo" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {v8Bank && (
            <TabsContent value={v8Bank.id.toString()}>
              <input name="type" type="hidden" value="v8bank" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {v8Zalopay && (
            <TabsContent value={v8Zalopay.id.toString()}>
              <input name="type" type="hidden" value="v8zalo" />

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {bank && (
            <TabsContent value="manual bank">
              <input name="type" type="hidden" value="manual" />
              <input name="method" type="hidden" value="bank" />

              <h2 className="text-sm font-bold">{t("Deposit Details")}</h2>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Account Number")}</span>
                <ClipboardField
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-gray-500"
                  value={bank.account_number}
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Holder Name")}</span>
                <ClipboardField
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-gray-500"
                  value={bank.account_holder_name}
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("BIC Code")}</span>
                <ClipboardField
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-gray-500"
                  value={bank.bank_code}
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("CK Content")}</span>
                <ClipboardField
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-gray-500"
                  value={String(user.id)}
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Payment time")}</span>
                <input
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                  defaultValue={new Date().toISOString().split(".")[0]}
                  name="submitted_at"
                  required
                  type="datetime-local"
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-yellow-700">
                {t("instruction.transfer.recharge")
                  .split("\n")
                  .map((text, row) => (
                    // eslint-disable-next-line react/no-array-index-key -- -
                    <p className="flex gap-1" key={row}>
                      <InfoFilled className="size-4 shrink-0" />
                      <span className="whitespace-break-spaces">{text}</span>
                    </p>
                  ))}
              </div>

              {/*
              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Sender Name")}</span>
                <input
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                  name="account_holder_name"
                  placeholder={t("Write here")}
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Sender Account Number")}</span>
                <input
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                  name="account_number"
                  placeholder={t("Write here")}
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Bank Name")}</span>
                <label className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5">
                  <select className="w-full appearance-none text-xs text-black" name="bank_code" required>
                    {BANK_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <CaretDownFill size={rem(8)} />
                </label>
              </div>*/}

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          {crypto && (
            <TabsContent value="manual crypto">
              <input name="type" type="hidden" value="manual" />
              <input name="method" type="hidden" value="crypto" />

              <p className="text-xs text-gray-600">
                {t(
                  "Please transfer amount you want to this wallet address {value} any amount lower than this will not be added and write from which account you transferred",
                  {
                    value: format(TRANSACTION_AMOUNTS[0], {
                      style: "currency",
                    }),
                  },
                )}
              </p>

              <h2 className="text-sm font-bold">{t("Deposit Details")}</h2>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Wallet Address")}</span>
                <ClipboardField
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-gray-500"
                  value={crypto.wallet_address}
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Network")}</span>
                <ClipboardField
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-gray-500"
                  value={crypto.network}
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Sender Name")}</span>
                <input
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                  name="account_holder_name"
                  placeholder={t("Write here")}
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Sender Account Number")}</span>
                <input
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                  name="account_number"
                  placeholder={t("Write here")}
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold">{t("Payment time")}</span>
                <input
                  className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
                  defaultValue={new Date().toISOString().split(".")[0]}
                  name="submitted_at"
                  required
                  type="datetime-local"
                />
              </div>

              <div className="flex flex-col gap-1 text-xs text-yellow-700">
                {t("instruction.transfer.recharge")
                  .split("\n")
                  .map((text, row) => (
                    // eslint-disable-next-line react/no-array-index-key -- -
                    <p className="flex gap-1" key={row}>
                      <InfoFilled className="size-4 shrink-0" />
                      <span className="whitespace-break-spaces">{text}</span>
                    </p>
                  ))}
              </div>

              <h2 className="text-sm font-bold">{t("Deposit Amount")}</h2>

              <WalletRechargeAmount range={TRANSACTION_AMOUNTS.slice(0, 6)} />
            </TabsContent>
          )}

          <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
            {t("Recharge")}
          </SubmitButton>
        </TabsProvider>
      </Form>
    </>
  );
}
