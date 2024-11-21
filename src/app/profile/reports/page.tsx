import ReportPeriod from "@components/profile/report/period";
import type { ReportResponse } from "@data/profile";
import { getUserReport } from "@data/profile";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";

const labels: Partial<Record<keyof ReportResponse, string>> = {
  total_coding: "Total coding",
  event_gifts: "Event Gifts",
  recharge_amount: "Recharge\nAmount",
  withdraw_amount: "Withdrawal\nAmount",
  rebate_lower: "Rebate\n(Lower level)",
  rebate_itself: "Rebate\n(self)",
  agent_commission: "Agent\nCommission",
  deposit_offer: "Deposit\nOffers",
};

type ProfileReportPageProps = {
  searchParams: {
    period?: string;
  };
};

export default async function ProfileReportPage(props: ProfileReportPageProps) {
  const t = await getTranslations();

  const { period = "today" } = props.searchParams;

  const details = await getUserReport(period);

  return (
    <>
      <div className="flex flex-col gap-2.5 rounded-2xl bg-blue-100 p-4 pb-2.5 text-center">
        <strong className="text-[0.625rem]">{t("Profit Amount")}</strong>

        <div className="rounded-2xl bg-white p-3">
          <strong className="text-3xl text-blue-500">
            {format(details.profits, {
              style: "currency",
              fractionDigits: 0,
            })}
          </strong>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-blue-100 p-4 text-[0.625rem]">
        <strong>{`${t("Profit calculation formula")}:`}</strong>

        <p>
          {t(
            "Lottery prize distribution - lottery code + battle win or loss + Tianneng win or loss + event gift money (including deposit discount) + rebate (self & subordinates) + agent commission",
          )}
        </p>
      </div>

      <ReportPeriod period={period} />

      <div className="grid grid-cols-3 gap-2.5">
        {Object.keys(labels).map((key) => (
          <strong className="flex flex-col items-center rounded-2xl bg-blue-100 px-4 pb-2.5 pt-6" key={key}>
            <span className="text-blue-500">
              {format(details[key as keyof ReportResponse], {
                style: "currency",
                notation: "compact",
                fractionDigits: 0,
              })}
            </span>
            <span className="whitespace-pre text-center text-xs">{t(labels[key as keyof ReportResponse]!)}</span>
          </strong>
        ))}
      </div>
    </>
  );
}
