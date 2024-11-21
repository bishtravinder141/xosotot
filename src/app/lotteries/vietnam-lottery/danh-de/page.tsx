import { submit } from "@action/lottery/vietnam-lottery";
import History from "@components/icon/fa-solid/history";
import Card from "@components/icon/ion/card";
import Cash from "@components/icon/ion/cash";
import CupBold from "@components/icon/solar/cup-bold";
import LotteryBetDrawer from "@components/lottery/bet/drawer";
import VietnamLotteryBet from "@components/lottery/bet/vietnam-lottery";
import VietnamLotteryBetCombinations from "@components/lottery/bet/vietnam-lottery-combinations";
import LotteryDetailsSkeleton from "@components/lottery/details/details.skeleton";
import LotteryVietnamLotteryDetails from "@components/lottery/details/vietnam-lottery";
import LotteryRecordsSkeleton from "@components/lottery/records/records.skeleton";
import LotteryVietnamLotteryHistory from "@components/lottery/records/vietnam-lottery-history";
import LotteryRules from "@components/lottery/rules";
import LotteryTabsProvider from "@components/lottery/tabs";
import VietnamLotteryPreviousResult from "@components/lottery/vietnam-lottery/previous-result";
import VietnamLotterySelectCombination from "@components/lottery/vietnam-lottery/select-combination";
import VietnamLotteryTimer from "@components/lottery/vietnam-lottery/timer";
import { CombinationProvider, CombinationTrigger } from "@components/primitive/combination";
import { LotteryProvider } from "@components/primitive/lottery";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import Skeleton from "@components/shared/skeleton";
import UserTokenValidator from "@components/user/token-validator";
import WalletBalance from "@components/wallet/balance";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type VietnamLotteryDanhDePageProps = {
  searchParams: {
    area?: string;
    date?: string;
    page?: string;
    cityid?: string;
    cityname?: string;
  };
};

export default async function VietnamLotteryDanhDePage(props: VietnamLotteryDanhDePageProps) {
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

      <LotteryTabsProvider initial="1">
        <TabsContent value="1">
          <LotteryRules>{t("lottery.vietnam-lottery.danh-de.rules.0")}</LotteryRules>
        </TabsContent>
        <TabsContent value="2">
          <LotteryRules>
            {t("lottery.vietnam-lottery.danh-de.rules.1", { prizes: ![1, 2].includes(area) })}
          </LotteryRules>
        </TabsContent>
        <TabsContent value="3">
          <LotteryRules>{t("lottery.vietnam-lottery.danh-de.rules.2")}</LotteryRules>
        </TabsContent>

        <div className="flex justify-between gap-5">
          <TabsTrigger
            className="group flex w-0 grow items-center justify-center gap-1.5 rounded bg-red-300 py-4 text-[0.625rem] font-bold leading-3 text-white"
            value="1"
          >
            <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
              <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=selected]:bg-white" />
            </span>
            {t("Head and Tail")}
          </TabsTrigger>
          <TabsTrigger
            className="group flex w-0 grow items-center justify-center gap-1.5 rounded bg-red-300 py-4 text-[0.625rem] font-bold leading-3 text-white"
            value="2"
          >
            <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
              <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=selected]:bg-white" />
            </span>
            {t("Head")}
          </TabsTrigger>
          <TabsTrigger
            className="group flex w-0 grow items-center justify-center gap-1.5 rounded bg-red-300 py-4 text-[0.625rem] font-bold leading-3 text-white"
            value="3"
          >
            <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
              <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=selected]:bg-white" />
            </span>
            {t("Special")}
          </TabsTrigger>
        </div>

        <Suspense fallback={<Skeleton className="h-14 rounded-xl" />}>
          <VietnamLotteryPreviousResult area={area} city={cityName} title="Đánh đề" />
        </Suspense>

        <div className="flex flex-col items-center gap-2 rounded-lg bg-red-300 p-2.5 text-white">
          <div className="flex gap-2 text-[0.625rem]">
            <span className="whitespace-nowrap font-bold">{t("Left time to buy")}</span>
          </div>

          <VietnamLotteryTimer area={area} city={cityId} date={date} />
        </div>

        <TabsContent value="1">
          <CombinationProvider size={2} type="1">
            <div className="flex flex-col gap-1.5 rounded-xl bg-red-50 px-2.5 py-2">
              <strong className="text-[0.5rem] leading-3">{`${t("Picked combinations")}:`}</strong>

              <VietnamLotteryBetCombinations />
            </div>

            <div className="flex items-center justify-between gap-2.5 rounded-xl border border-red-300 bg-red-50 px-2.5 py-2 text-[0.625rem]">
              <VietnamLotterySelectCombination className="p-3" size={2} />
            </div>

            <div className="flex flex-col rounded-xl border border-red-300 bg-red-50 p-4">
              <span className="mb-2.5 text-xs">{`${t("Select your combination")}:`}</span>

              <div className="grid grid-cols-5 gap-x-3.5 gap-y-2.5">
                {Array.from(Array(10)).map((_, index) => (
                  <CombinationTrigger
                    className="aspect-square rounded-xl bg-red-300 text-white"
                    // eslint-disable-next-line react/no-array-index-key -- -
                    key={index}
                    value={index}
                  >
                    {index}
                  </CombinationTrigger>
                ))}
              </div>
            </div>
          </CombinationProvider>
        </TabsContent>

        <TabsContent value="2">
          <CombinationProvider size={2} type="2">
            <div className="flex flex-col gap-1.5 rounded-xl bg-red-50 px-2.5 py-2">
              <strong className="text-[0.5rem] leading-3">{`${t("Picked combinations")}:`}</strong>

              <VietnamLotteryBetCombinations />
            </div>

            <div className="flex items-center justify-between gap-2.5 rounded-xl border border-red-300 bg-red-50 px-2.5 py-2 text-[0.625rem]">
              <VietnamLotterySelectCombination className="p-3" size={2} />
            </div>

            <div className="flex flex-col rounded-xl border border-red-300 bg-red-50 p-4">
              <span className="mb-2.5 text-xs">{`${t("Select your combination")}:`}</span>

              <div className="grid grid-cols-5 gap-x-3.5 gap-y-2.5">
                {Array.from(Array(10)).map((_, index) => (
                  <CombinationTrigger
                    className="aspect-square rounded-xl bg-red-300 text-white"
                    // eslint-disable-next-line react/no-array-index-key -- -
                    key={index}
                    value={index}
                  >
                    {index}
                  </CombinationTrigger>
                ))}
              </div>
            </div>
          </CombinationProvider>
        </TabsContent>

        <TabsContent value="3">
          <CombinationProvider size={2} type="3">
            <div className="flex flex-col gap-1.5 rounded-xl bg-red-50 px-2.5 py-2">
              <strong className="text-[0.5rem] leading-3">{`${t("Picked combinations")}:`}</strong>

              <VietnamLotteryBetCombinations />
            </div>

            <div className="flex items-center justify-between gap-2.5 rounded-xl border border-red-300 bg-red-50 px-2.5 py-2 text-[0.625rem]">
              <VietnamLotterySelectCombination className="p-3" size={2} />
            </div>

            <div className="flex flex-col rounded-xl border border-red-300 bg-red-50 p-4">
              <span className="mb-2.5 text-xs">{`${t("Select your combination")}:`}</span>

              <div className="grid grid-cols-5 gap-x-3.5 gap-y-2.5">
                {Array.from(Array(10)).map((_, index) => (
                  <CombinationTrigger
                    className="aspect-square rounded-xl bg-red-300 text-white"
                    // eslint-disable-next-line react/no-array-index-key -- -
                    key={index}
                    value={index}
                  >
                    {index}
                  </CombinationTrigger>
                ))}
              </div>
            </div>
          </CombinationProvider>
        </TabsContent>

        <LotteryBetDrawer action={submit}>
          <VietnamLotteryBet visible />

          <input name="date" type="hidden" value={date} />
          <input name="area" type="hidden" value={area} />
          <input name="city" type="hidden" value={cityId} />
          <input name="typeid" type="hidden" value="5" />
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
                  <LotteryVietnamLotteryHistory area={area} city={cityName} page={page} title="Đánh đề" />
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="bet history">
              <div className="-mb-2.5 mt-0.5 flex items-center justify-between gap-4 text-xs font-bold">
                <span>{t("Check all results")}</span>
              </div>
              <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
                <Suspense fallback={<LotteryDetailsSkeleton limit={20} />}>
                  <LotteryVietnamLotteryDetails page={page} title="Đánh đề" />
                </Suspense>
              </div>
            </TabsContent>
          </div>
        </TabsProvider>
      </LotteryTabsProvider>
    </LotteryProvider>
  );
}
