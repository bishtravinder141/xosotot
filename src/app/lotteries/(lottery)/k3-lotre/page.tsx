import { submit } from "@action/lottery/k3-lotre";
import LotteryK3BetDrawer from "@components/lottery/bet/k3-drawer";
import LotteryK3LotreBet from "@components/lottery/bet/k3-lotre";
import LotteryK3LotreResultPopup from "@components/lottery/bet/k3-lotre-result-popup";
import K3Details from "@components/lottery/k3/detials";
import LotteryDice from "@components/lottery/k3/dice";
import LotteryK3LotrePeriod from "@components/lottery/period/k3-lotre";
import LotteryK3LotreResultCounter from "@components/lottery/result/k3-lotre-counter";
import LotteryRules from "@components/lottery/rules";
import LotteryTabsProvider from "@components/lottery/tabs";
import LotteryUpdatePlugin from "@components/plugin/lottery-update";
import { K3LotreBetTrigger } from "@components/primitive/lottery";
import { TabsContent, TabsTrigger } from "@components/primitive/tabs";
import QueryTab from "@components/shared/query-tab";
import Skeleton from "@components/shared/skeleton";
import { LOTTERY_DICE_SUMS, LOTTERY_PERIODS, LOTTERY_SIZES, LOTTERY_TYPES } from "@config/lottery";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
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

type LotteryK3LotrePageProps = {
  searchParams: {
    period?: string;
  };
};

export default async function LotteryK3LotrePage(props: LotteryK3LotrePageProps) {
  const period = LOTTERY_PERIODS.find((item) => !props.searchParams.period || props.searchParams.period === item.type);

  if (!period) {
    notFound();
  }

  const t = await getTranslations();

  return (
    <>
      <Suspense>
        <LotteryK3LotreResultPopup type={period.type} />
      </Suspense>
      <LotteryUpdatePlugin period={period.duration} />

      <div className="flex gap-3">
        {LOTTERY_PERIODS.map((item) => (
          <QueryTab active={period.type === item.type} key={item.type} name="period" value={item.type}>
            {t("{value} min", { value: item.duration / 60_000 })}
          </QueryTab>
        ))}
      </div>

      <LotteryRules>{t("lottery.k3-lotre.rules")}</LotteryRules>

      <div className="flex flex-col items-center gap-2 rounded-lg bg-red-300 p-2.5 text-white">
        <div className="flex gap-2 text-[0.625rem]">
          <span className="whitespace-nowrap font-bold">{t("Left time to buy")}</span>

          <Suspense fallback={<Skeleton className="my-0.5 h-3 w-20 rounded" />}>
            <LotteryK3LotrePeriod type={period.type} />
          </Suspense>
        </div>

        <LotteryTimer period={period.duration} />
      </div>

      <Suspense fallback={<Skeleton className="h-20 rounded-lg py-1" />}>
        <div className="flex flex-col rounded-lg bg-red-50 px-5 py-3">
          <LotteryK3LotreResultCounter period={period.duration} type={period.type} />
        </div>
      </Suspense>

      <div className="relative space-y-4">
        <LotteryTabsProvider initial="0">
          <div className="flex gap-2">
            {["Total Bet", "2 Same No", "3 Match No", "Diff numbers"].map((group, index) => (
              <TabsTrigger
                className="flex-1 rounded-t bg-red-50 py-2.5 text-[0.625rem] font-bold leading-3 data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
                key={group}
                value={index.toString()}
              >
                {t(group)}
              </TabsTrigger>
            ))}
          </div>

          <div className="!mt-0 space-y-4 rounded-b-md bg-red-300 p-2.5 text-white">
            <TabsContent value="0">
              <div className="grid grid-cols-4 gap-x-1 gap-y-2">
                {LOTTERY_DICE_SUMS.map((sum) => (
                  <K3LotreBetTrigger
                    attach
                    className="group flex flex-col gap-2 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                    expand
                    key={sum.value}
                    type="1"
                    value={sum.value}
                  >
                    <small className="text-[0.5rem] text-gray-800">{sum.odds}</small>
                    <p className="flex w-full items-center justify-between font-bold">
                      {sum.value}
                      <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                        <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                      </span>
                    </p>
                  </K3LotreBetTrigger>
                ))}
                {LOTTERY_SIZES.map((size) => (
                  <K3LotreBetTrigger
                    className="group flex flex-col gap-2 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                    expand
                    key={size.value}
                    type="2"
                    value={size.value}
                  >
                    <small className="text-[0.5rem] text-gray-800">{2}</small>
                    <p className="flex w-full items-center justify-between font-bold">
                      {t(size.name)}
                      <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                        <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                      </span>
                    </p>
                  </K3LotreBetTrigger>
                ))}
                {LOTTERY_TYPES.map((type) => (
                  <K3LotreBetTrigger
                    className="group flex flex-col gap-2 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                    expand
                    key={type.value}
                    type="3"
                    value={type.value}
                  >
                    <small className="text-[0.5rem] text-gray-800">{2}</small>
                    <p className="flex w-full items-center justify-between font-bold">
                      {t(type.name)}
                      <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                        <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                      </span>
                    </p>
                  </K3LotreBetTrigger>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="1">
              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose 2 matching numbers")}：${t("Odds")} x13.83`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={6} size={16} value={5} />
                      <LotteryDice className="size-16" offset={6} size={16} value={5} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("If the opening number matches the 2 betting numbers, its a win")}. (${t("Except for three same numbers")})`}
                    </p>
                  </K3Details>
                </p>

                <div className="flex gap-2">
                  {"123456".split("").map((value) => (
                    <K3LotreBetTrigger
                      attach
                      className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-[0.625rem] leading-none text-red-300"
                      expand
                      key={value}
                      type="4"
                      value={value}
                    >
                      <small className="text-[0.375rem] text-gray-800">{13.83}</small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {value + value}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </K3LotreBetTrigger>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose a unique pair of numbers")}：${t("Odds")} x69.12`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={2} size={16} value={6} />
                      <LotteryDice className="size-16" offset={5} size={16} value={1} />
                      <LotteryDice className="size-16" offset={2} size={16} value={6} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("Choose at least 1 pair same numbers and 1 different number to bet")}. ${t("If the opening number matches the betting number, its a win")}`}
                    </p>
                  </K3Details>
                </p>

                <div className="flex gap-2">
                  {"123456".split("").map((value) => (
                    <K3LotreBetTrigger
                      attach
                      className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-[0.625rem] leading-none text-red-300"
                      expand
                      key={value}
                      type="5:1"
                      value={value}
                    >
                      <small className="text-[0.375rem] text-gray-800">{69.12}</small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {value + value}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </K3LotreBetTrigger>
                  ))}
                </div>

                <div className="!mt-2 flex gap-2">
                  {"123456".split("").map((value) => (
                    <K3LotreBetTrigger
                      attach
                      className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-[0.625rem] leading-none text-red-300"
                      expand
                      key={value}
                      type="5:2"
                      value={value}
                    >
                      <small className="text-[0.375rem] text-gray-800">{69.12}</small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {value}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </K3LotreBetTrigger>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="2">
              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose only a 3 numbers")}：${t("Odds")} x207.36`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={3} size={16} value={6} />
                      <LotteryDice className="size-16" offset={3} size={16} value={6} />
                      <LotteryDice className="size-16" offset={3} size={16} value={6} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("If the opening number matches a 3 betting numbers, its a win")}.`}
                    </p>
                  </K3Details>
                </p>

                <div className="flex gap-2">
                  {"123456".split("").map((value) => (
                    <K3LotreBetTrigger
                      attach
                      className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-[0.625rem] leading-none text-red-300"
                      expand
                      key={value}
                      type="6"
                      value={value}
                    >
                      <small className="whitespace-nowrap text-[0.375rem] text-gray-800">{207.36}</small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {value + value + value}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </K3LotreBetTrigger>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose 3 matching numbers")}：${t("Odds")} x34.56`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={3} size={16} value={6} />
                      <LotteryDice className="size-16" offset={3} size={16} value={6} />
                      <LotteryDice className="size-16" offset={3} size={16} value={6} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("If the opening numbers are any of three consecutive numbers, That is the winning result")}.`}
                    </p>
                  </K3Details>
                </p>

                <K3LotreBetTrigger
                  attach
                  className="group flex w-full flex-col items-center gap-1 rounded bg-white p-2.5 text-[0.625rem] leading-none text-red-300"
                  expand
                  type="7"
                  value="ABC"
                >
                  <small className="-mt-1 whitespace-nowrap text-[0.375rem] leading-none text-gray-800">
                    {`${t("Odds")} x${format(34.56, {
                      style: "decimal",
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 2,
                    })}`}
                  </small>
                  <p className="flex items-center justify-between gap-1.5 font-bold">
                    {t("Choose 3 matching numbers")}
                    <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                      <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                    </span>
                  </p>
                </K3LotreBetTrigger>
              </div>
            </TabsContent>

            <TabsContent value="3">
              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose 3 different numbers")}：${t("Odds")} x34.56`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={0} size={16} value={1} />
                      <LotteryDice className="size-16" offset={3} size={16} value={2} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("Choose 3 or more numbers and do not duplicate numbers. If you draw the same number as the selected numbers, you will win.")}`}
                    </p>
                  </K3Details>
                </p>

                <div className="flex gap-2">
                  {"123456".split("").map((value) => (
                    <K3LotreBetTrigger
                      attach
                      className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-[0.625rem] leading-none text-red-300"
                      expand
                      key={value}
                      type="8"
                      value={value}
                    >
                      <small className="whitespace-nowrap text-[0.375rem] text-gray-800">{34.56}</small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {value}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </K3LotreBetTrigger>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose 3 consecutive numbers")}：${t("Odds")} x8.64`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={0} size={16} value={1} />
                      <LotteryDice className="size-16" offset={3} size={16} value={2} />
                      <LotteryDice className="size-16" offset={5} size={16} value={3} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("If the opening numbers are in the same number of any three number, its a win")}.`}
                    </p>
                  </K3Details>
                </p>

                <K3LotreBetTrigger
                  attach
                  className="group flex w-full flex-col items-center gap-1 rounded bg-white p-2.5 text-[0.625rem] leading-none text-red-300"
                  expand
                  type="9"
                  value="ABC"
                >
                  <small className="-mt-1 whitespace-nowrap text-[0.375rem] leading-none text-gray-800">
                    {`${t("Odds")} x${format(8.64, {
                      style: "decimal",
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 2,
                    })}`}
                  </small>
                  <p className="flex items-center justify-between gap-1.5 font-bold">
                    {t("Choose 3 matching numbers")}
                    <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                      <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                    </span>
                  </p>
                </K3LotreBetTrigger>
              </div>

              <div className="space-y-2.5">
                <p className="flex items-center gap-1 text-[0.625rem] font-bold">
                  {`${t("Choose 2 different numbers")}：${t("Odds")} x6.91`}

                  <K3Details>
                    <div className="flex justify-center gap-3">
                      <LotteryDice className="size-16" offset={0} size={16} value={1} />
                      <LotteryDice className="size-16" offset={3} size={16} value={2} />
                      <LotteryDice className="size-16" offset={1} size={16} value={4} />
                    </div>

                    <p className="text-center text-[0.625rem]">
                      {`*${t("Choose 2 or more numbers and do not duplicate numbers. If you draw the same number as the selected numbers, you will win.")}`}
                    </p>
                  </K3Details>
                </p>

                <div className="flex gap-2">
                  {"123456".split("").map((value) => (
                    <K3LotreBetTrigger
                      attach
                      className="group flex w-0 grow flex-col gap-2 rounded bg-white p-1.5 text-[0.625rem] leading-none text-red-300"
                      expand
                      key={value}
                      type="10"
                      value={value}
                    >
                      <small className="whitespace-nowrap text-[0.375rem] text-gray-800">{6.91}</small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {value}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-1.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </K3LotreBetTrigger>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </LotteryTabsProvider>

        <LotteryTimerOverlay className="!m-0" period={period.duration} />
      </div>

      <LotteryK3BetDrawer action={submit}>
        <LotteryK3LotreBet />

        <input name="typeid" type="hidden" value={period.type} />
      </LotteryK3BetDrawer>
    </>
  );
}
