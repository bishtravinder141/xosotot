import type { PropsWithChildren } from "react";

type WithdrawInfoProps = PropsWithChildren<{
  position: number;
}>;

export default function WithdrawInfo(props: WithdrawInfoProps) {
  return (
    <div className="flex items-center gap-2 px-1.5">
      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
        <span className="font-bold">{props.position}</span>
      </div>
      <p>{props.children}</p>
    </div>
  );
}
