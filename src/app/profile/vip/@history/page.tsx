import LotteryRecordsSkeleton from "@components/lottery/records/records.skeleton";
import VipHistory from "@components/profile/vip/history";
import { Suspense } from "react";

type ProfileVipHistorySlotPageProps = {
  searchParams: {
    page?: string;
  };
};

export default function ProfileVipHistorySlotPage(props: ProfileVipHistorySlotPageProps) {
  const key = JSON.stringify(props.searchParams);
  const page = parseInt(props.searchParams.page ?? "1");

  return (
    <div className="min-w-max scroll-mt-20 space-y-2.5 overflow-x-auto">
      <Suspense fallback={<LotteryRecordsSkeleton limit={20} />} key={key}>
        <VipHistory page={page} />
      </Suspense>
    </div>
  );
}
