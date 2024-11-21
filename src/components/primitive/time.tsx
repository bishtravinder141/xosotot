"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const TimeContext = createContext(Date.now());

type Options = {
  interval?: number;
};

export function useNow(options?: Options) {
  const timestamp = useContext(TimeContext);
  const [offset, setOffset] = useState(performance.now());

  useEffect(() => {
    const interval = options?.interval;

    if (!interval) {
      return;
    }

    const timer = setInterval(() => {
      setOffset(performance.now());
    }, interval);

    return function cancel() {
      clearInterval(timer);
    };
  }, [options?.interval]);

  return new Date(timestamp + offset);
}

type TimeProviderProps = PropsWithChildren<{
  now: number;
}>;

export function TimeProvider(props: TimeProviderProps) {
  // eslint-disable-next-line -- -
  const [timestamp] = useState(props.now);

  return <TimeContext.Provider value={timestamp}>{props.children}</TimeContext.Provider>;
}
