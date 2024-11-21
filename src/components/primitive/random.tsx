"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { Children, createContext, useContext, useRef, useState } from "react";

const RandomContext = createContext([null as string | null, (() => void 0) as VoidFunction] as const);

export function useRandom() {
  return useContext(RandomContext);
}

type RandomProviderProps = PropsWithChildren<{
  type: string;
  values: string[];
}>;

export function RandomProvider(props: RandomProviderProps) {
  const [_bets, setBets] = useLotteryBets();
  const timer = useRef<NodeJS.Timeout>();
  const [selected, setSelected] = useState<string | null>(null);

  return <RandomContext.Provider value={[selected, random]}>{props.children}</RandomContext.Provider>;

  function random() {
    let limit = 4000;
    clearInterval(timer.current);

    timer.current = setInterval(() => {
      const index = Math.floor(Math.random() * props.values.length);

      if (limit > 0) {
        setSelected(props.values[index]);
        limit -= 100;
      } else {
        setBets([
          {
            type: props.type,
            value: props.values[index],
          },
        ]);
        setSelected(null);
        clearInterval(timer.current);
      }
    }, 100);
  }
}

export function RandomTrigger(props: HTMLAttributes<HTMLButtonElement>) {
  const [_selected, random] = useRandom();

  return <button type="button" {...props} onClick={random} />;
}

type RandomConsumerProps = {
  children: ReactElement<{
    type: string;
    value: string;
    attache?: boolean;
  }>;
};

export function RandomConsumer(props: RandomConsumerProps) {
  const [selected] = useRandom();
  const [bets] = useLotteryBets();

  const child = Children.only(props.children);
  const Component = child.type;

  let state: string | undefined;

  if (bets.some((item) => item.type === child.props.type && item.value === child.props.value)) {
    state = "active";
  }

  if (
    selected === child.props.value ||
    (child.props.attache && bets.some((item) => item.value === child.props.value))
  ) {
    state = "selected";
  }

  return <Component {...child.props} data-state={state} />;
}
