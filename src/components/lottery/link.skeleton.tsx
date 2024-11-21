"use client";

import Skeleton from "@components/shared/skeleton";

export default function LotteryLinkSkeleton() {
  return (
    <div className="rounded-b rounded-t-lg bg-gray-900">
      <Skeleton className="aspect-21/9 rounded-lg" />
      <div className="h-8" />
    </div>
  );
}
