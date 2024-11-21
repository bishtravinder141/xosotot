import award from "@assets/images/benefit/award.png";
import gift from "@assets/images/benefit/gift.png";
import Crown from "@components/icon/custom/crown";
import InfoFilled from "@components/icon/epi/info-filled";
import WalletSolid from "@components/icon/iconoir/wallet-solid";
import { TabsContent, TabsProvider } from "@components/primitive/tabs";
import ProfileAdvance from "@components/profile/advance";
import BenefitCard from "@components/profile/benefit/card";
import Skeleton from "@components/shared/skeleton";
import { getMembershipDetails, getUserMembership } from "@data/membership";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import dynamic from "next/dynamic";
import NextImage from "next/image";

const MembershipCarousel = dynamic(() => import("@components/profile/vip/membership-carousel"), {
  loading: () => (
    <div className="flex gap-3 overflow-hidden">
      <Skeleton className="h-36 w-80 shrink-0 rounded-2xl" />
      <Skeleton className="h-36 w-80 shrink-0 rounded-2xl" />
    </div>
  ),
  ssr: false,
});

export default async function ProfileVipPage() {
  const t = await getTranslations();

  const { user } = await getSession();
  const [membership, details] = await Promise.all([
    getUserMembership().catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
    getMembershipDetails().catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
  ]);

  const memberships = details?.memberships.filter((item) => !membership || membership.exp < item.exp_to);

  return (
    <>
      <div className="mb-12 rounded-lg bg-gradient-to-br from-punch-600 to-apricot-300 p-4">
        <div className="flex items-center gap-2.5 text-white">
          <NextImage
            alt={user.name}
            className="size-16 shrink-0 rounded-full object-cover"
            height={64}
            src={user.avatar}
            width={64}
          />

          <div className="mr-auto flex flex-col items-center justify-center">
            <div className="flex items-center gap-1">
              <strong className="text-xs">{user.name}</strong>
            </div>

            <div className="mt-1.5 flex gap-0.5 self-start rounded-full bg-tacao-300 px-2 py-1">
              <ProfileAdvance className="shrink-0" level={membership?.level ?? 0} size={14} />
              <span className="text-[0.625rem] text-red-300">{`Vip ${membership?.level ?? 0}`}</span>
            </div>
          </div>

          <ProfileAdvance className="shrink-0" level={membership?.level ?? 0} size={64} />
        </div>

        <div className="-mb-12 mt-4 flex justify-between">
          <div className="flex w-[45%] flex-col gap-1 rounded-2xl bg-white px-6 py-4 text-center shadow-xl">
            <strong className="text-[0.625rem]">{t("My experience")}</strong>
            <strong className="italic text-blue-500">{`${membership?.exp} EXP`}</strong>
          </div>

          <div className="flex w-[45%] flex-col gap-1 rounded-2xl bg-white px-6 py-4 text-center shadow-xl">
            <strong className="text-[0.625rem]">{t("Payout time")}</strong>
            <strong className="italic text-blue-500">{`${details?.payout} Days`}</strong>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-2xl bg-blue-100 px-2.5 py-3">
        <InfoFilled className="shrink-0 text-blue-500" size={rem(18)} />
        <p className="text-[0.625rem]">{t("VIP level rewards are settled at 2:00 am on the Ist of every month")}</p>
        <div className="shrink-0" style={{ width: rem(18) }} />
      </div>

      {membership && memberships && (
        <TabsProvider initial={membership.level.toString()}>
          <MembershipCarousel details={membership} memberships={memberships} />

          {memberships.map((item) => {
            const up = JSON.parse(item.month_reward);
            const month = JSON.parse(item.level_up_reward);

            return (
              <TabsContent key={item.level} value={item.level.toString()}>
                <h2 className="flex items-center gap-2.5 text-xs font-bold text-blue-500">
                  <Crown size={20} />
                  {t("VIP {level} Benefits level", { level: item.level })}
                </h2>

                <BenefitCard
                  description={t("Each account can only receive 1 time")}
                  image={gift.src}
                  title={t("Level up rewards")}
                >
                  <div className="flex gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-white">
                    <WalletSolid size={rem(14)} />
                    {format(up.point_1, {
                      style: "decimal",
                      fractionDigits: 0,
                    })}
                  </div>
                </BenefitCard>

                <BenefitCard
                  description={t("Each account can only receive 1 time per month")}
                  image={award.src}
                  title={t("Monthly reward")}
                >
                  <div className="flex gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-white">
                    <WalletSolid size={rem(14)} />
                    {format(month.point_2, {
                      style: "decimal",
                      fractionDigits: 0,
                    })}
                  </div>
                </BenefitCard>
              </TabsContent>
            );
          })}
        </TabsProvider>
      )}
    </>
  );
}
