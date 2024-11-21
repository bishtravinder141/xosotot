"use client";

import { LOTTERY_AMOUNTS, LOTTERY_COUNTS } from "@config/lottery";
import type { Dispatch, HTMLAttributes, MouseEvent, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

export type Bet = {
  type: string;
  value: string;
};

const LotteryContext = createContext(
  null as null | {
    bets: Bet[];
    count: number;
    amount: number;
    setBets: Dispatch<SetStateAction<Bet[]>>;
    setCount: Dispatch<SetStateAction<number>>;
    setAmount: Dispatch<SetStateAction<number>>;
  },
);

export function useLotteryBets() {
  const context = useContext(LotteryContext);

  if (context) {
    return [context.bets, context.setBets] as const;
  }

  throw new Error("useLotteryBets must be used within a LotteryProvider");
}

export function useLotteryCount() {
  const context = useContext(LotteryContext);

  if (context) {
    return [context.count, context.setCount] as const;
  }

  throw new Error("useLotteryCount must be used within a LotteryProvider");
}

export function useLotteryAmount() {
  const context = useContext(LotteryContext);

  if (context) {
    return [context.amount, context.setAmount] as const;
  }

  throw new Error("useLotteryAmount must be used within a LotteryProvider");
}

export function LotteryProvider(props: PropsWithChildren) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [count, setCount] = useState(LOTTERY_COUNTS[0]);
  const [amount, setAmount] = useState(LOTTERY_AMOUNTS[0]);

  return (
    <LotteryContext.Provider value={{ bets, setBets, count, setCount, amount, setAmount }}>
      {props.children}
    </LotteryContext.Provider>
  );
}

type LotteryBetTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  type: string;
  value: string;
  expand?: boolean;
  attach?: boolean;
};

export function LotteryBetTrigger(props: LotteryBetTriggerProps) {
  const { type, value, expand, attach, ...attrs } = props;

  const [bets, setBets] = useLotteryBets();

  let state: string | undefined;

  if (attach && bets.some((item) => item.value === value)) {
    state = "selected";
  }

  if (bets.some((item) => item.type === type && item.value === value)) {
    state = "active";
  }

  return <button data-state={state} type="button" {...attrs} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    const bet = { type, value };

    if (bets.some((item) => item.type === type && item.value === value)) {
      setBets(bets.filter((item) => item.type !== type || item.value !== value));

      //
    } else if (attach && expand) {
      setBets([...bets, bet]);

      //
    } else if (expand) {
      setBets([...bets.filter((item) => item.type !== props.type), bet]);

      //
    } else if (attach) {
      setBets([...bets.filter((item) => item.type === props.type), bet]);

      //
    } else {
      setBets([bet]);
    }

    attrs.onClick?.(event);
  }
}

export function K3LotreBetTrigger(props: LotteryBetTriggerProps) {
  const { type, value, expand, attach, ...attrs } = props;

  const [bets, setBets] = useLotteryBets();

  let state: string | undefined;

  if (attach && bets.some((item) => item.value === value)) {
    state = "selected";
  }

  if (bets.some((item) => item.type === type && item.value === value)) {
    state = "active";
  }

  return <button data-state={state} type="button" {...attrs} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    const bet = { type, value };

    if (bets.some((item) => item.type === type && item.value === value)) {
      setBets(bets.filter((item) => item.type !== type || item.value !== value));

      //
    } else {
      let newBets = bets;

      if (bet.type === "5:1") {
        newBets = bets.filter((item) => item.value !== value || item.type !== "5:2");
      }

      if (bet.type === "5:2") {
        newBets = bets.filter((item) => item.value !== value || item.type !== "5:1");
      }

      if (attach && expand) {
        setBets([...newBets, bet]);

        //
      } else if (expand) {
        setBets([...newBets.filter((item) => item.type !== props.type), bet]);

        //
      } else if (attach) {
        setBets([...newBets.filter((item) => item.type === props.type), bet]);

        //
      } else {
        setBets([bet]);
      }
    }

    attrs.onClick?.(event);
  }
}

type LotteryCountTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: number;
};

export function LotteryCountTrigger(props: LotteryCountTriggerProps) {
  const { value, ...attrs } = props;

  const [count, setCount] = useLotteryCount();

  return <button type="button" {...attrs} data-state={value === count ? "active" : void 0} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    setCount(value);

    attrs.onClick?.(event);
  }
}

type LotteryAmountTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: number;
};

export function LotteryAmountTrigger(props: LotteryAmountTriggerProps) {
  const { value, ...attrs } = props;

  const [amount, setAmount] = useLotteryAmount();

  return <button type="button" {...attrs} data-state={value === amount ? "active" : void 0} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    setAmount(value);

    attrs.onClick?.(event);
  }
}
