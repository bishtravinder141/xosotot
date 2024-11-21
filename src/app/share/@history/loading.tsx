import Skeleton from "@components/shared/skeleton";

export default function ShareHistorySlotLoading() {
  return (
    <>
      <div className="space-y-2.5">
        {Array.from(Array(10)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <Skeleton className="h-14 rounded-lg" key={index} />
        ))}
      </div>

      <Skeleton className="mx-auto h-6 w-24 rounded-lg" />
    </>
  );
}
