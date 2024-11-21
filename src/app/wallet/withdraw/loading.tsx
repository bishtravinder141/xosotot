import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";

export default async function WithdrawLoading() {
  const t = await getTranslations();

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="flex items-center gap-2">
          <span className="mr-auto text-sm font-bold">{t("Wallet Balance")}</span>
        </div>

        <Skeleton className="h-10 rounded-md" />

        <div className="flex gap-3">
          <Skeleton className="h-10 grow rounded-md" />
          <Skeleton className="h-10 grow rounded-md" />
        </div>

        <Skeleton className="h-10 rounded-md" />

        <h2 className="text-sm font-bold">{t("Payout")}</h2>

        <Skeleton className="h-10 rounded-md" />

        <Skeleton className="h-10 rounded-md" />

        <span className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-center text-xs font-bold text-white">
          {t("Withdraw")}
        </span>
      </div>

      <div className="space-y-4 rounded-lg bg-blue-100 px-2.5 py-4 text-[0.625rem] leading-none text-black">
        <div className="flex items-center gap-2 px-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
        </div>

        <hr className="border-blue-500" />

        <div className="flex items-center gap-2 px-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
        </div>

        <hr className="border-blue-500" />

        <div className="flex items-center gap-2 px-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
        </div>

        <hr className="border-blue-500" />

        <div className="flex items-center gap-2 px-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
        </div>

        <hr className="border-blue-500" />

        <div className="flex items-center gap-2 px-1.5">
          <Skeleton className="h-5 w-full rounded-md" />
        </div>
      </div>
    </>
  );
}
