import Calendar from "@components/icon/custom/calendar";
import Tag from "@components/icon/custom/tag";
import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";

export default async function ShareDataSlotLoading() {
  const t = await getTranslations();

  return (
    <>
      <div className="flex gap-3 text-[0.5rem]">
        <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
          <Skeleton className="h-6 rounded-md" />

          <div className="space-y-0.5">
            <h2 className="text-[0.625rem] font-bold">{t("Yesterday")}</h2>
            <p>{t("Total Commission")}</p>
          </div>
        </div>
        <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
          <Skeleton className="h-6 rounded-md" />

          <div className="space-y-0.5">
            <h2 className="text-[0.625rem] font-bold">{t("Direct")}</h2>
            <p>{t("Commission")}</p>
          </div>
        </div>
        <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
          <Skeleton className="h-6 rounded-md" />

          <div className="space-y-0.5">
            <h2 className="text-[0.625rem] font-bold">{t("Team")}</h2>
            <p>{t("Commission")}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <h2 className="text-xs font-bold">{t("Long Press To Save The QR Code")}</h2>

        <div className="flex gap-3">
          <div className="flex w-0 grow flex-col gap-2 text-[0.5rem] font-bold text-white">
            <Skeleton className="h-7 rounded-md" />
            <Skeleton className="h-7 rounded-md" />
          </div>
          <Skeleton className="w-0 grow rounded-md" />
        </div>
      </div>

      <div className="-mx-5 space-y-2.5 rounded-2xl bg-blue-100 p-5">
        <h2 className="mb-5 flex items-center gap-1.5 text-xs font-bold">
          <Tag className="text-blue-500" />
          {t("Rebate Amount Corresponding Table")}
        </h2>

        <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
          <span className="w-14 grow">{t("Agent Level")}</span>
          <span className="w-16 grow">{t("Total Referrals")}</span>
          <span className="w-10 grow">{t("Total Bet")}</span>
          <span className="w-10 grow">{t("Recharge")}</span>
        </div>

        {Array.from(Array(7)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Skeleton className="h-10 rounded-lg" key={index} />
        ))}
      </div>

      <div className="-mx-5 space-y-2.5 rounded-2xl bg-blue-100 p-5">
        <h2 className="mb-5 flex items-center gap-1.5 text-xs font-bold">
          <Calendar className="text-blue-500" />
          {t("Commission Calculation Method (Lottery)")}
        </h2>

        <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
          <span className="flex-1">{t("Hierarchy")}</span>
          <span className="flex-1">{t("Tier {value}", { value: 1 })}</span>
          <span className="flex-1">{t("Tier {value}", { value: 2 })}</span>
          <span className="flex-1">{t("Tier {value}", { value: 3 })}</span>
        </div>

        {Array.from(Array(7)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Skeleton className="h-10 rounded-lg" key={index} />
        ))}
      </div>
    </>
  );
}
