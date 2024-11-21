import History from "@components/icon/fa-solid/history";
import CupBold from "@components/icon/solar/cup-bold";
import Chart from "@components/icon/uis/chart";
import LotteryDetailsSkeleton from "@components/lottery/details/details.skeleton";
import LotteryK3LotreDetails from "@components/lottery/details/k3-lotre";
import LotteryK3LotreChart from "@components/lottery/records/k3-lotre-chart";
import LotteryK3LotreHistory from "@components/lottery/records/k3-lotre-history";
import LotteryRecordsSkeleton from "@components/lottery/records/records.skeleton";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import { LOTTERY_PERIODS } from "@config/lottery";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type LotteryRecordsSlotProps = {
  searchParams: {
    page?: string;
    period?: string;
  };
};

export default async function LotteryRecordsSlot(props: LotteryRecordsSlotProps) {
  const key = JSON.stringify(props.searchParams);
  const page = parseInt(props.searchParams.page ?? "1");
  const period = LOTTERY_PERIODS.find((item) => !props.searchParams.period || props.searchParams.period === item.type);

  if (!period) {
    notFound();
  }

  const t = await getTranslations();

  return (
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
          value="chart"
        >
          <Chart size={rem(16)} />
          {t("Chart")}
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
              <span className="w-10 grow">{t("Sum")}</span>
              <span className="w-28 grow">{t("Result")}</span>
            </header>

            <Suspense fallback={<LotteryRecordsSkeleton limit={20} />} key={key}>
              <LotteryK3LotreHistory page={page} type={period.type} />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
            <header className="flex gap-4 rounded-lg bg-blue-100 px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
              <span className="w-20 text-left">{t("Period")}</span>
              <span className="w-28 grow">{t("Multiply")}</span>
              <span className="w-20 grow">{t("Result")}</span>
            </header>

            <Suspense fallback={<LotteryRecordsSkeleton limit={20} />} key={key}>
              <LotteryK3LotreChart page={page} type={period.type} />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="bet history">
          <div className="-mb-2.5 mt-0.5 flex items-center justify-between gap-4 text-xs font-bold">
            <span>{t("Check all results")}</span>
          </div>
          <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
            <Suspense fallback={<LotteryDetailsSkeleton limit={20} />} key={key}>
              <LotteryK3LotreDetails page={page} type={period.type} />
            </Suspense>
          </div>
        </TabsContent>
      </div>
    </TabsProvider>
  );
}
