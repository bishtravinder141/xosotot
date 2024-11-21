import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";

export default async function HomeWinnersSlotLoading() {
  const t = await getTranslations();

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-500">{t("Withdraws")}</h2>

      <div className="space-y-2.5 text-xs tracking-wide text-white">
        {Array.from(Array(4)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Skeleton className="h-[4.25rem] rounded-lg" key={index} />
        ))}
      </div>
    </section>
  );
}
