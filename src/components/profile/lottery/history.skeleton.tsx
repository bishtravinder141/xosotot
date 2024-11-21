import Skeleton from "@components/shared/skeleton";

export default function ProfileLotteryHistorySkeleton() {
  return (
    <>
      <div className="space-y-2.5">
        {Array.from(Array(10)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Skeleton className="h-14 rounded-lg" key={index} />
        ))}
      </div>

      <div className="flex justify-center pb-1">
        <Skeleton className="h-7 w-6/12 rounded-lg" />
      </div>
    </>
  );
}
