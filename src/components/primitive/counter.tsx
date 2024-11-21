"use client";

import type { HTMLAttributes } from "react";
import { Children, cloneElement, createContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const CounterContext = createContext(0);

export function Counter(props: HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...attrs } = props;

  const count = Children.count(children);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((state) => (state - 1) % count);
    }, 3500);

    return function cancel() {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div {...attrs} className={twMerge("relative flex flex-col overflow-hidden", className)}>
      <CounterContext.Provider value={0}>
        {Children.map(children, (child, index) =>
          cloneElement(child as never, {
            style: {
              transform: `translateY(${(offset + index < -1 ? count + offset : offset) * 100}%)`,
              transition: `transform ${offset + index === -2 ? 0 : 250}ms ease-in-out`,
            },
          }),
        )}
      </CounterContext.Provider>
    </div>
  );
}
