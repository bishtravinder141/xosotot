import Calendar from "@components/icon/custom/calendar";
import Tag from "@components/icon/custom/tag";
import CashLine from "@components/icon/ri/cash-line";
import ClipboardTrigger from "@components/primitive/clipboard-trigger";
import QRCodeDialog from "@components/shared/qr-code-dialog";
import { getCommissions, getCommissionSummary } from "@data/commission";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";

export default async function ShareDataSlot() {
  const t = await getTranslations();
  const session = await getSession();

  const [commissions, summary] = await Promise.all([
    //
    getCommissions().catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
    getCommissionSummary().catch((error: unknown) => {
      if (error instanceof UnauthorizedError) {
        return null;
      }

      throw error;
    }),
  ]);

  return (
    <>
      <div className="flex gap-3 text-[0.5rem]">
        <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
          <p className="flex items-center gap-0.5 rounded-md bg-white px-1 py-1.5">
            <CashLine size={rem(8)} />
            {summary?.yesterday ?? 0}
          </p>

          <div className="space-y-0.5">
            <h2 className="text-[0.625rem] font-bold">{t("Yesterday")}</h2>
            <p>{t("Total Commission")}</p>
          </div>
        </div>
        <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
          <p className="flex items-center gap-0.5 rounded-md bg-white px-1 py-1.5">
            <CashLine size={rem(8)} />
            {summary?.direct ?? 0}
          </p>

          <div className="space-y-0.5">
            <h2 className="text-[0.625rem] font-bold">{t("Direct")}</h2>
            <p>{t("Commission")}</p>
          </div>
        </div>
        <div className="flex w-0 grow flex-col gap-1.5 rounded-lg bg-red-50 p-1.5">
          <p className="flex items-center gap-0.5 rounded-md bg-white px-1 py-1.5">
            <CashLine size={rem(8)} />
            {summary?.team ?? 0}
          </p>

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
            <ClipboardTrigger className="rounded-md bg-red-300 p-2" value={session.user.invitation_code}>
              {t("Copy Invitation Code")}
            </ClipboardTrigger>
            <ClipboardTrigger
              className="rounded-md bg-red-300 p-2"
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/registration?ref=${session.user.invitation_code}`}
            >
              {t("Copy Link")}
            </ClipboardTrigger>
          </div>

          <QRCodeDialog invitation_code={session.user.invitation_code} qrcode={session.user.qrcode} />
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

        {commissions?.map((commission) => (
          <div
            className="flex gap-2.5 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white"
            key={commission.id}
          >
            <span className="w-14 grow">{commission.name}</span>
            <span className="w-16 grow">{commission.total_referral}</span>
            <span className="w-10 grow">
              {format(commission.total_bet, {
                style: "currency",
                notation: "compact",
              })}
            </span>
            <span className="w-10 grow">
              {format(commission.recharge, {
                style: "currency",
                notation: "compact",
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="-mx-5 space-y-2.5 rounded-2xl bg-blue-100 p-5">
        <h2 className="mb-5 flex items-center gap-1.5 text-xs font-bold">
          <Calendar className="text-blue-500" />
          {t("Commission Calculation Method (Lottery)")}
        </h2>

        <div className="flex gap-2.5 rounded-lg bg-white px-4 py-3 text-center text-[0.625rem] font-bold leading-4">
          <span className="w-12 grow">{t("Hierarchy")}</span>
          <span className="w-10 grow">{t("Tier {value}", { value: 1 })}</span>
          <span className="w-10 grow">{t("Tier {value}", { value: 2 })}</span>
          <span className="w-10 grow">{t("Tier {value}", { value: 3 })}</span>
          <span className="w-10 grow">{t("Tier {value}", { value: 4 })}</span>
          <span className="w-10 grow">{t("Tier {value}", { value: 5 })}</span>
          <span className="w-10 grow">{t("Tier {value}", { value: 6 })}</span>
        </div>

        {commissions?.map((commission) => (
          <div
            className="flex gap-2.5 rounded-lg bg-blue-500 bg-card-confetti bg-full bg-center px-4 py-3 text-center text-[0.625rem] leading-4 text-white"
            key={commission.id}
          >
            <span className="w-12 grow">{commission.name}</span>
            <span className="w-10 grow">{commission.tier_1}</span>
            <span className="w-10 grow">{commission.tier_2}</span>
            <span className="w-10 grow">{commission.tier_3}</span>
            <span className="w-10 grow">{commission.tier_4}</span>
            <span className="w-10 grow">{commission.tier_5}</span>
            <span className="w-10 grow">{commission.tier_6}</span>
          </div>
        ))}
      </div>
    </>
  );
}
