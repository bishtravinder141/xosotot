import Skeleton from "@components/shared/skeleton";

type LotteryRecordsSkeletonProps = {
  limit?: number;
};

export default function LotteryRecordsSkeleton(props: LotteryRecordsSkeletonProps) {
  return (
    <>
      {Array.from(Array(props.limit ?? 10).keys()).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Skeleton className="h-10 rounded-lg" key={index} />
      ))}

      <div className="mt-5 flex justify-center">
        <Skeleton className="h-7 w-8/12 rounded-lg" />
      </div>
    </>
  );
}
