import { submit } from "@action/lottery/5d-lotre";
import Check from "@components/icon/custom/check";
import Ball from "@components/icon/xosotot/ball";
import Lottery5DLotreBet from "@components/lottery/bet/5d-lotre";
import Lottery5DLotreResultPopup from "@components/lottery/bet/5d-lotre-result-popup";
import LotteryBetDrawer from "@components/lottery/bet/drawer";
import Lottery5DLotrePeriod from "@components/lottery/period/5d-lotre";
import Lottery5DLotreResult from "@components/lottery/result/5d-lotre";
import Lottery5DLotreResultCounter from "@components/lottery/result/5d-lotre-counter";
import Lottery5DLotreResultSkeleton from "@components/lottery/result/5d-lotre.skeleton";
import LotteryResultCounterSkeleton from "@components/lottery/result/counter.skeleton";
import LotteryRules from "@components/lottery/rules";
import LotteryTabsProvider from "@components/lottery/tabs";
import LotteryUpdatePlugin from "@components/plugin/lottery-update";
import { LotteryBetTrigger } from "@components/primitive/lottery";
import { TabsContent, TabsTrigger } from "@components/primitive/tabs";
import QueryTab from "@components/shared/query-tab";
import Skeleton from "@components/shared/skeleton";
import { LOTTERY_NUMBERS, LOTTERY_PERIODS, LOTTERY_SIZES, LOTTERY_TYPES } from "@config/lottery";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const LotteryTimer = dynamic(() => import("@components/lottery/timer"), {
  loading: () => <Skeleton className="h-12 w-44 rounded-md px-0.5" />,
  ssr: false,
});

const LotteryTimerOverlay = dynamic(() => import("@components/lottery/timer-overlay"), {
  ssr: false,
});

type Lottery5DLotrePageProps = {
  searchParams: {
    period?: string;
  };
};

export default async function Lottery5DLotrePage(props: Lottery5DLotrePageProps) {
  const period = LOTTERY_PERIODS.find((item) => !props.searchParams.period || props.searchParams.period === item.type);

  if (!period) {
    notFound();
  }

  const t = await getTranslations();

  return (
    <>
      <Suspense>
        <Lottery5DLotreResultPopup type={period.type} />
      </Suspense>
      <LotteryUpdatePlugin period={period.duration} />

      <div className="flex gap-3">
        {LOTTERY_PERIODS.map((item) => (
          <QueryTab active={period.type === item.type} key={item.type} name="period" value={item.type}>
            {t("{value} min", { value: item.duration / 60_000 })}
          </QueryTab>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-red-50 p-2.5">
        <p className="flex gap-2 text-[0.625rem] font-bold">{t("Previous results")}</p>

        <div className="flex justify-between">
          <Suspense fallback={<Lottery5DLotreResultSkeleton />}>
            <Lottery5DLotreResult type={period.type} />
          </Suspense>
        </div>
      </div>

      <LotteryRules>{t("lottery.5d-lotre.rules")}</LotteryRules>

      <div className="flex flex-col items-center gap-2 rounded-lg bg-red-300 p-2.5 text-white">
        <div className="flex gap-2 text-[0.625rem]">
          <span className="whitespace-nowrap font-bold">{t("Left time to buy")}</span>

          <Suspense fallback={<Skeleton className="my-0.5 h-3 w-20 rounded" />}>
            <Lottery5DLotrePeriod type={period.type} />
          </Suspense>
        </div>

        <LotteryTimer period={period.duration} />
      </div>

      <div className="flex flex-col rounded-lg bg-red-50 px-5">
        <Suspense fallback={<LotteryResultCounterSkeleton />}>
          <Lottery5DLotreResultCounter period={period.duration} type={period.type} />
        </Suspense>
      </div>

      <div className="relative space-y-4">
        <LotteryTabsProvider initial="0">
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
        </LotteryTabsProvider>

        <LotteryTimerOverlay className="!m-0" period={period.duration} />
      </div>

      <LotteryBetDrawer action={submit}>
        <Lottery5DLotreBet />

        <input name="typeid" type="hidden" value={period.type} />
      </LotteryBetDrawer>
    </>
  );
}
