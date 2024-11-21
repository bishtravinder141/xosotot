import Skeleton from "@components/shared/skeleton";

export default async function LotteryResultCounterSkeleton() {
  return (
    <div className="flex h-24 justify-between overflow-hidden">
      {"ABCDE".split("").map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <div className="-mt-8 flex flex-col gap-2" key={index}>
          {Array.from(Array(3)).map((__, j) => (
            // eslint-disable-next-line react/no-array-index-key -- -
            <Skeleton className="size-12 shrink-0 rounded-full" key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}
