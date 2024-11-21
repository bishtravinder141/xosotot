import Skeleton from "@components/shared/skeleton";

export default async function WalletTransactionsSkeleton() {
  return (
    <div className="mt-2.5 space-y-2.5">
      {Array.from(Array(10)).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Skeleton className="h-12 rounded-lg" key={index} />
      ))}
    </div>
  );
}
