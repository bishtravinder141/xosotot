import VietnamLotteryCitiesSkeleton from "@components/lottery/vietnam-lottery/cities.skeleton";
import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";

export default async function VietnamLotteryLoading() {
  const t = await getTranslations();

  return (
    <>
      <div className="flex gap-2.5">
        <Skeleton className="h-16 flex-1 rounded" />
        <Skeleton className="h-16 flex-1 rounded" />
        <Skeleton className="h-16 flex-1 rounded" />
      </div>

      <div className="flex gap-2.5">
        <Skeleton className="h-11 flex-1 rounded" />
        <Skeleton className="h-11 flex-1 rounded" />
        <Skeleton className="h-11 flex-1 rounded" />
      </div>

      <div className="space-y-2.5">
        <strong>{t("City")}</strong>

        <VietnamLotteryCitiesSkeleton />
      </div>
    </>
  );
}
