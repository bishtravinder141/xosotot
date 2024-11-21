import onearmed from "@assets/images/home/one-armed.png";
import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function HomeGamesSlotLoading() {
  const t = await getTranslations();

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-3 font-bold text-blue-500">
        {t("Other games")}
        <NextImage alt="Other games" className="size-5 shrink-0" height={20} src={onearmed} width={20} />
      </h2>

      <div className="-mx-5 flex gap-3 overflow-x-auto px-5">
        {Array.from(Array(5)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Skeleton className="size-40 shrink-0 rounded-md" key={index} />
        ))}
      </div>
    </section>
  );
}
