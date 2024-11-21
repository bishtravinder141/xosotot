import Skeleton from "@components/shared/skeleton";
import { getVietnamLotteryIssue } from "@data/lottery/vietnam-lottery";
import dynamic from "next/dynamic";

const LotteryTimer = dynamic(() => import("@components/lottery/timer"), {
  loading: () => <Skeleton className="h-12 w-72 rounded-md" />,
  ssr: false,
});

type VietnamLotteryTimerProps = {
  area: number;
  date: string;
  city: number;
  className?: string;
};

export default async function VietnamLotteryTimer(props: VietnamLotteryTimerProps) {
  const issue = await getVietnamLotteryIssue(props.area, props.city, props.date).catch(() => ({
    expired: Date.now(),
  }));

  const expired = new Date(issue.expired).getTime();

  return <LotteryTimer expired={expired - 3_600_000} hours />;
}
