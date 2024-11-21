"use client";

import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type TickerProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: string | string[];
};

export default function Ticker(props: TickerProps) {
  const { children, className, ...attrs } = props;

  const fragments = typeof children === "string" ? [children] : children;

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = container.current!;

    target.style.setProperty("--ticker-width", `${target.offsetWidth}px`);

    // @ts-expect-error -- -
    for (const child of target.children) {
      child.style.animationDuration = `${(child.offsetWidth / 100).toFixed(2)}s`;
    }
  }, [children]);

  return (
    <div {...attrs} className={twMerge("overflow-hidden", className)} ref={container}>
      <p className="flex w-max animate-ticker gap-ticker">
        {fragments.map((child, i) => (
          // eslint-disable-next-line react/no-array-index-key -- -
          <span className="shrink-0 whitespace-nowrap font-bold text-blue-500" key={i}>
            {child}
          </span>
        ))}
      </p>
    </div>
  );
}
