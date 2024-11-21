import Skeleton from "@components/shared/skeleton";

export default function Lottery5DLotreResultSkeleton() {
  return (
    <>
      {"ABCDE".split("").map((group, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <div className="flex flex-col items-center" key={index}>
          <Skeleton className="size-10 rounded-full" />
          <span className="text-[0.625rem] font-bold leading-4">{group}</span>
        </div>
      ))}
      <span className="mb-4 self-center text-sm font-bold">=</span>
      <Skeleton className="mb-4 size-10 rounded-full" />
    </>
  );
}
