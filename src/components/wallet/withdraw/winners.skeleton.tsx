import Skeleton from "@components/shared/skeleton";

export default function WalletWithdrawWinnersSkeleton() {
  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Skeleton className="h-16 rounded-lg" key={index} />
      ))}
    </>
  );
}
