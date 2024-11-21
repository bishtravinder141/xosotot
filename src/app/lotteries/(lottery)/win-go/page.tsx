import { submit } from "@action/lottery/win-go";
import Check from "@components/icon/custom/check";
import Ball from "@components/icon/xosotot/ball";
import LotteryBetDrawer from "@components/lottery/bet/drawer";
import LotteryWinGoBet from "@components/lottery/bet/win-go";
import LotteryWinGoResultPopup from "@components/lottery/bet/win-go-result-popup";
import LotteryWinGoPeriod from "@components/lottery/period/win-go";
import LotteryWinGoResult from "@components/lottery/result/win-go";
import LotteryRules from "@components/lottery/rules";
import LotteryUpdatePlugin from "@components/plugin/lottery-update";
import { LotteryBetTrigger, LotteryCountTrigger } from "@components/primitive/lottery";
import { RandomConsumer, RandomProvider, RandomTrigger } from "@components/primitive/random";
import QueryTab from "@components/shared/query-tab";
import Skeleton from "@components/shared/skeleton";
import { LOTTERY_COLORS, LOTTERY_COUNTS, LOTTERY_NUMBERS, LOTTERY_PERIODS, LOTTERY_SIZES } from "@config/lottery";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";

const LotteryTimer = dynamic(() => import("@components/lottery/timer"), {
  loading: () => <Skeleton className="h-12 w-44 self-center rounded-md px-0.5" />,
  ssr: false,
});

const LotteryTimerOverlay = dynamic(() => import("@components/lottery/timer-overlay"), {
  ssr: false,
});

type LotteryWinGoPageProps = {
  searchParams: {
    period?: string;
  };
};

export default async function LotteryWinGoPage(props: LotteryWinGoPageProps) {
  const period = LOTTERY_PERIODS.find((item) => !props.searchParams.period || props.searchParams.period === item.type);

  if (!period) {
    notFound();
  }

  const t = await getTranslations();

  return (
    <>
      <Suspense>
        <LotteryWinGoResultPopup type={period.type} />
      </Suspense>
      <LotteryUpdatePlugin period={period.duration} />

      <div className="flex gap-3">
        {LOTTERY_PERIODS.map((item) => (
          <QueryTab active={period.type === item.type} key={item.type} name="period" value={item.type}>
            {t("{value} min", { value: item.duration / 60_000 })}
          </QueryTab>
        ))}
      </div>

      <LotteryRules>{t("lottery.win-go.rules")}</LotteryRules>

      <div className="flex gap-3">
        <div className="flex w-0 grow flex-col gap-2 rounded-lg bg-red-300 p-2.5 text-white">
          <div className="flex justify-between gap-2 text-[0.625rem] leading-4">
            <span className="whitespace-nowrap font-bold">{t("Left time to buy")}</span>

            <Suspense fallback={<Skeleton className="my-0.5 h-3 w-20 rounded" />}>
              <LotteryWinGoPeriod type={period.type} />
            </Suspense>
          </div>

          <LotteryTimer className="self-center" period={period.duration} />
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5">
          <p className="whitespace-nowrap text-[0.5rem] font-bold">{t("Previous results")}</p>

          <Suspense fallback={<Skeleton className="size-12 rounded-full" />}>
            <LotteryWinGoResult type={period.type} />
          </Suspense>
        </div>
      </div>

      <div className="relative space-y-4">
        <div className="flex gap-3">
          {LOTTERY_COLORS.map((color) => (
            <LotteryBetTrigger
              className={twMerge(
                "group flex w-0 grow items-center justify-between rounded-lg from-15% to-80% p-3 text-sm font-bold text-white bg-gradient-[177]",
                color.bg,
              )}
              key={color.value}
              type="0"
              value={color.value}
            >
              {t(color.name)}
              <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
                <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-white" />
              </span>
            </LotteryBetTrigger>
          ))}
        </div>

        <RandomProvider type="0" values={LOTTERY_NUMBERS.map((number) => number.value.toString())}>
          <div className="grid grid-cols-[repeat(5,60px)] justify-between gap-y-3">
            {LOTTERY_NUMBERS.map((number) => (
              <RandomConsumer key={number.value}>
                <LotteryBetTrigger
                  className="group relative inline-flex overflow-hidden rounded-lg bg-transparent p-1.5 transition-colors data-[state=active]:bg-red-300 data-[state=selected]:bg-red-100"
                  type="0"
                  value={number.value.toString()}
                >
                  <Ball color={number.color as never}>{number.value}</Ball>
                  <span className="absolute bottom-0 right-0 rounded-tl bg-green-800 p-0.5 text-white opacity-0 transition-opacity group-data-[state=active]:opacity-100">
                    <Check size={rem(7)} />
                  </span>
                </LotteryBetTrigger>
              </RandomConsumer>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {LOTTERY_COUNTS.map((value) => (
              <LotteryCountTrigger
                className="flex-1 rounded bg-red-50 p-2.5 text-[0.625rem] font-bold leading-3 data-[state=active]:bg-red-300 data-[state=active]:text-white"
                key={value}
                value={value}
              >
                {`X${value}`}
              </LotteryCountTrigger>
            ))}
            <RandomTrigger className="flex-1 rounded bg-red-50 p-2.5 text-[0.625rem] font-bold leading-3 data-[state=active]:bg-red-300 data-[state=active]:text-white">
              {t("Random")}
            </RandomTrigger>
          </div>
        </RandomProvider>

        <div className="flex gap-3">
          {LOTTERY_SIZES.map((size) => (
            <LotteryBetTrigger
              className={twMerge(
                "group flex w-0 grow items-center justify-between rounded-lg from-15% to-80% p-3 text-sm font-bold text-white bg-gradient-[177]",
                size.bg,
              )}
              key={size.value}
              type="0"
              value={size.value}
            >
              {t(size.name)}
              <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
                <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-white" />
              </span>
            </LotteryBetTrigger>
          ))}
        </div>

        <LotteryTimerOverlay className="!m-0" period={period.duration} />
      </div>

      <LotteryBetDrawer action={submit}>
        <LotteryWinGoBet />

        <input name="typeid" type="hidden" value={period.type} />
      </LotteryBetDrawer>
    </>
  );
}
