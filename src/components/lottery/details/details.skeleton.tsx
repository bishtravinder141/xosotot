import Skeleton from "@components/shared/skeleton";

type LotteryDetailsSkeletonProps = {
  limit?: number;
};

export default function LotteryDetailsSkeleton(props: LotteryDetailsSkeletonProps) {
  return (
    <>
      {Array.from(Array(props.limit ?? 10).keys()).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Skeleton className="h-14 rounded-lg" key={index} />
      ))}

      <div className="mt-5 flex justify-center">
        <Skeleton className="h-7 w-8/12 rounded-lg" />
      </div>
    </>
  );
}
