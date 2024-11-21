"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import type { Dispatch, HTMLAttributes, MouseEvent, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

const CombinationContext = createContext(null as null | [number[], Dispatch<SetStateAction<number[]>>]);

export function useCombination() {
  const context = useContext(CombinationContext);

  if (context) {
    return context;
  }

  throw new Error("useCombination must be used within a CombinationProvider");
}

type CombinationProviderProps = PropsWithChildren<{
  type: string;
  size: number;
}>;

export function CombinationProvider(props: CombinationProviderProps) {
  const [bets, setBets] = useLotteryBets();
  const [combinations, setCombinations] = useState<number[]>([]);

  return <CombinationContext.Provider value={[combinations, update]}>{props.children}</CombinationContext.Provider>;

  function update(value: SetStateAction<number[]>) {
    const action = typeof value === "function" ? value : () => value;

    const state = action(combinations);

    if (state.length >= props.size) {
      const bet = state.join("");

      if (!bets.some((item) => item.value === bet)) {
        setBets([...bets, { type: props.type, value: bet }]);
      }

      setCombinations([]);
    } else {
      setCombinations(state);
    }
  }
}

type LotteryBetTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: number;
};

export function CombinationTrigger(props: LotteryBetTriggerProps) {
  const { value, ...attrs } = props;

  const [combinations, setCombination] = useCombination();

  let state: string | undefined;

  if (combinations.some((item) => item === value)) {
    state = "selected";
  }

  return <button data-state={state} type="button" {...attrs} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    setCombination([...combinations, value]);

    attrs.onClick?.(event);
  }
}
