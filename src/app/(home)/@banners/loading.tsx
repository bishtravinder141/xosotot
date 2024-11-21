import Skeleton from "@components/shared/skeleton";

export default function HomeBannersSlotLoading() {
  return (
    <div className="space-y-2.5">
      <Skeleton className="aspect-2/1 rounded-lg" />
      <Skeleton className="mx-auto h-2.5 w-24 rounded-full" />
    </div>
  );
}
