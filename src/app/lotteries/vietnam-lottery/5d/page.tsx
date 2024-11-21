import { submit } from "@action/lottery/vietnam-lottery";
import Check from "@components/icon/custom/check";
import History from "@components/icon/fa-solid/history";
import Card from "@components/icon/ion/card";
import Cash from "@components/icon/ion/cash";
import CupBold from "@components/icon/solar/cup-bold";
import Ball from "@components/icon/xosotot/ball";
import LotteryBetDrawer from "@components/lottery/bet/drawer";
import VietnamLotteryBet from "@components/lottery/bet/vietnam-lottery";
import LotteryDetailsSkeleton from "@components/lottery/details/details.skeleton";
import LotteryVietnamLotteryDetails from "@components/lottery/details/vietnam-lottery";
import LotteryRecordsSkeleton from "@components/lottery/records/records.skeleton";
import LotteryVietnamLotteryHistory from "@components/lottery/records/vietnam-lottery-history";
import LotteryRules from "@components/lottery/rules";
import LotteryTabsProvider from "@components/lottery/tabs";
import VietnamLotteryPreviousResult from "@components/lottery/vietnam-lottery/previous-result";
import VietnamLotteryTimer from "@components/lottery/vietnam-lottery/timer";
import { LotteryBetTrigger, LotteryProvider } from "@components/primitive/lottery";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import Skeleton from "@components/shared/skeleton";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import { LOTTERY_NUMBERS, LOTTERY_SIZES, LOTTERY_TYPES } from "@config/lottery";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type VietnamLottery5DPageProps = {
  searchParams: {
    area?: string;
    date?: string;
    page?: string;
    cityid?: string;
    cityname?: string;
  };
};

export default async function VietnamLottery5DPage(props: VietnamLottery5DPageProps) {
  if (!props.searchParams.area || !props.searchParams.cityid || !props.searchParams.cityname) {
    notFound();
  }

  const area = parseInt(props.searchParams.area);
  const date = props.searchParams.date ?? new Date().toISOString().split("T")[0];
  const page = parseInt(props.searchParams.page ?? "1");
  const cityId = parseInt(props.searchParams.cityid);
  const cityName = props.searchParams.cityname;

  const t = await getTranslations();

  return (
    <LotteryProvider>
      <UserTokenValidator />

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

      <LotteryTabsProvider initial="0">
        <LotteryRules>{t("lottery.vietnam-lottery.5d.rules")}</LotteryRules>

        <Suspense fallback={<Skeleton className="h-14 rounded-xl" />}>
          <VietnamLotteryPreviousResult area={area} city={cityName} title="5D" />
        </Suspense>

        <div className="flex flex-col items-center gap-2 rounded-lg bg-red-300 p-2.5 text-white">
          <div className="flex gap-2 text-[0.625rem]">
            <span className="whitespace-nowrap font-bold">{t("Left time to buy")}</span>
          </div>

          <VietnamLotteryTimer area={area} city={cityId} date={date} />
        </div>

        <div className="flex gap-2">
          {["A", "B", "C", "D", "E", t("Total")].map((group, index) => (
            <TabsTrigger
              className="flex-1 rounded-t bg-red-50 p-2.5 text-[0.625rem] font-bold leading-3 data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
              key={group}
              value={index.toString()}
            >
              {group}
            </TabsTrigger>
          ))}
        </div>

        <div className="!mt-0 flex gap-1 rounded-b-md bg-red-300 p-2.5 text-white">
          {"123456".split("").map((group, index) => (
            <TabsContent key={group} value={index.toString()}>
              {LOTTERY_SIZES.map((size) => (
                <LotteryBetTrigger
                  className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                  key={group + size.value}
                  type={`:${group}:`}
                  value={size.value}
                >
                  <small className="text-[0.5rem] text-gray-800">
                    {`${t("Odds")} x${format(2, {
                      style: "decimal",
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 2,
                    })}`}
                  </small>
                  <p className="flex w-full items-center justify-between font-bold">
                    {t(size.name)}
                    <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                      <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                    </span>
                  </p>
                </LotteryBetTrigger>
              ))}
              {LOTTERY_TYPES.map((type) => (
                <LotteryBetTrigger
                  className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                  key={group + type.value}
                  type={`:${group}:`}
                  value={type.value}
                >
                  <small className="text-[0.5rem] text-gray-800">
                    {`${t("Odds")} x${format(2, {
                      style: "decimal",
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 2,
                    })}`}
                  </small>
                  <p className="flex w-full items-center justify-between font-bold">
                    {t(type.name)}
                    <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                      <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                    </span>
                  </p>
                </LotteryBetTrigger>
              ))}
            </TabsContent>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(5,60px)] justify-between gap-y-3">
          {"12345".split("").map((group, index) => (
            <TabsContent key={group} value={index.toString()}>
              {LOTTERY_NUMBERS.map((number) => (
                <div className="relative flex flex-col items-center" key={group + number.value}>
                  <LotteryBetTrigger
                    attach
                    className="group relative inline-flex overflow-hidden rounded-lg bg-transparent p-1.5 transition-colors data-[state=active]:bg-red-300 data-[state=selected]:bg-red-100"
                    type={group}
                    value={number.value.toString()}
                  >
                    <Ball color="black">{number.value}</Ball>
                    <span className="absolute bottom-0 right-0 rounded-tl bg-green-800 p-0.5 text-white opacity-0 transition-opacity group-data-[state=active]:opacity-100">
                      <Check size={rem(7)} />
                    </span>
                  </LotteryBetTrigger>
                  <span className="-mt-1.5 text-[0.375rem] leading-none">x9.8</span>
                </div>
              ))}
            </TabsContent>
          ))}
          <TabsContent value="5">
            <div className="col-span-full my-0.5 h-32" />
          </TabsContent>
        </div>

        <LotteryBetDrawer action={submit}>
          <VietnamLotteryBet />

          <input name="date" type="hidden" value={date} />
          <input name="area" type="hidden" value={area} />
          <input name="city" type="hidden" value={cityId} />
          <input name="typeid" type="hidden" value="1" />
        </LotteryBetDrawer>

        <TabsProvider initial="history">
          <div className="flex gap-2.5 whitespace-nowrap text-xs font-bold text-blue-500">
            <TabsTrigger
              className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              value="history"
            >
              <History size={rem(16)} />
              {t("Game History")}
            </TabsTrigger>
            <TabsTrigger
              className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
              value="bet history"
            >
              <CupBold size={rem(16)} />
              {t("My Results")}
            </TabsTrigger>
          </div>

          <div className="-mx-5 space-y-5 overflow-x-auto px-5">
            <TabsContent value="history">
              <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
                <header className="flex gap-4 rounded-lg bg-blue-100 px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
                  <span className="w-20 text-left">{t("Period")}</span>
                  <span className="w-20">{t("Date")}</span>
                  <span className="w-32">{t("Result")}</span>
                </header>

                <Suspense fallback={<LotteryRecordsSkeleton limit={20} />}>
                  <LotteryVietnamLotteryHistory area={area} city={cityName} page={page} title="5D" />
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="bet history">
              <div className="-mb-2.5 mt-0.5 flex items-center justify-between gap-4 text-xs font-bold">
                <span>{t("Check all results")}</span>
              </div>
              <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
                <Suspense fallback={<LotteryDetailsSkeleton limit={20} />}>
                  <LotteryVietnamLotteryDetails page={page} title="5D" />
                </Suspense>
              </div>
            </TabsContent>
          </div>
        </TabsProvider>
      </LotteryTabsProvider>
    </LotteryProvider>
  );
}
