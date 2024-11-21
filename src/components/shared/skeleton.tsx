import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Skeleton(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={twMerge("relative box-content flex flex-col overflow-hidden bg-gray-200", props.className)}
    >
      <div className="absolute inset-0 grow animate-wave from-transparent from-35% via-white to-transparent to-65% bg-gradient-[90]" />
    </div>
  );
}
