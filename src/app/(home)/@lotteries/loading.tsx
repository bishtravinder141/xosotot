import roulette from "@assets/images/home/roulette.png";
import LotteryLinkSkeleton from "@components/lottery/link.skeleton";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function HomeLotteriesSlotLoading() {
  const t = await getTranslations();

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-2.5 font-bold text-blue-500">
        {t("Lottery")}
        <NextImage alt="Other games" className="size-5 shrink-0" height={20} src={roulette} width={20} />
      </h2>

      <div className="space-y-2.5">
        <LotteryLinkSkeleton />
        <LotteryLinkSkeleton />
        <LotteryLinkSkeleton />
        <LotteryLinkSkeleton />
        <LotteryLinkSkeleton />
      </div>
    </section>
  );
}
