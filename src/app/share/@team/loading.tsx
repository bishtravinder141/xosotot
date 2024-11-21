import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";

export default async function ShareTeamSlotLoading() {
  const t = await getTranslations();

  return (
    <>
      {Array.from(Array(6)).map((_, tier) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <div className="-mx-5 space-y-2.5 rounded-2xl bg-blue-100 p-5" key={tier}>
          <Skeleton className="mb-4 h-5 w-36 rounded-lg" />

          <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
            <span className="w-0 grow">UID</span>
            <span className="w-10 grow">{t("Name")}</span>
            <span className="w-10 grow">{t("Commission")}</span>
          </div>

          {Array.from(Array(6)).map((__, ref) => (
            // eslint-disable-next-line react/no-array-index-key -- -
            <Skeleton className="h-10 rounded-lg" key={ref} />
          ))}
        </div>
      ))}
    </>
  );
}
