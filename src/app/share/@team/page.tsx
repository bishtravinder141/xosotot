import notebook from "@assets/images/general/notebook.png";
import Calendar from "@components/icon/custom/calendar";
import { getReferrals } from "@data/referral";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function ShareTeamSlot() {
  const t = await getTranslations();
  const tiers = await Promise.all(
    Array.from(Array(6)).map((_, index) =>
      getReferrals(index + 1).catch((error: unknown) => {
        if (error instanceof UnauthorizedError) {
          return null;
        }

        throw error;
      }),
    ),
  );

  return (
    <>
      {tiers.map((tier, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <div className="-mx-5 space-y-2.5 rounded-2xl bg-blue-100 p-5" key={index}>
          <h2 className="mb-5 flex items-center gap-1.5 text-xs font-bold">
            <Calendar className="text-blue-500" />
            {t("Tier {tier} ({count} People)", {
              tier: index + 1,
              count: tier?.total ?? 0,
            })}
          </h2>

          <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
            <span className="w-0 grow">UID</span>
            <span className="w-10 grow">{t("Name")}</span>
            <span className="w-10 grow">{t("Commission")}</span>
          </div>

          {(tier === null || tier.referrals.length < 1) && (
            <div className="flex flex-col items-center gap-3 py-3">
              <NextImage alt="Notebook" className="max-w-24" src={notebook} />
              <p className="text-[0.625rem]">{t("No data available")}</p>
            </div>
          )}

          {tier?.referrals.map((referral) => (
            <div
              className="flex gap-2.5 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white"
              key={referral.user_id}
            >
              <span className="w-0 grow">{referral.user_id}</span>
              <span className="w-10 grow">{referral.name}</span>
              <span className="w-10 grow">
                {format(referral.commission, {
                  style: "currency",
                })}
              </span>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
