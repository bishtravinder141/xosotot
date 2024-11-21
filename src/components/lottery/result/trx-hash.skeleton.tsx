import Skeleton from "@components/shared/skeleton";

export default async function LotteryTrxHashResultSkeleton() {
  return (
    <>
      {Array.from(Array(5)).map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Skeleton className="size-12 rounded-full" key={index} />
      ))}
    </>
  );
}
