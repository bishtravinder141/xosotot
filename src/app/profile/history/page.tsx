import DateSelect from "@components/lottery/history/date-select";
import LotterySelect from "@components/lottery/history/lottery-select";
import ProfileLotteryHistory from "@components/profile/lottery/history";
import ProfileLotteryHistorySkeleton from "@components/profile/lottery/history.skeleton";
import UserTokenValidator from "@components/user/token-validator";
import { Suspense } from "react";

type ProfileHistoryPageProps = {
  searchParams: {
    date?: string;
    page?: string;
    lottery?: string;
  };
};

export default async function ProfileHistoryPage(props: ProfileHistoryPageProps) {
  const date = props.searchParams.date;
  const page = parseInt(props.searchParams.page || "1");
  const lottery = parseInt(props.searchParams.lottery || "1");

  return (
    <>
      <UserTokenValidator />

      <div className="flex gap-2.5">
        <LotterySelect lottery={lottery} />
        <DateSelect date={date} />
      </div>

      <Suspense fallback={<ProfileLotteryHistorySkeleton />} key={`:${lottery}:${page}:${date}`}>
        <ProfileLotteryHistory date={date} lottery={lottery} page={page} />
      </Suspense>
    </>
  );
}
