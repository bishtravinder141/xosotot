"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import { TabsProvider } from "@components/primitive/tabs";
import type { PropsWithChildren } from "react";

type LotteryTabsProvider = PropsWithChildren<{
  initial?: string;
}>;

export default function LotteryTabsProvider(props: LotteryTabsProvider) {
  const [_bets, setBets] = useLotteryBets();

  return (
    <TabsProvider initial={props.initial} onChange={onChange}>
      {props.children}
    </TabsProvider>
  );

  function onChange() {
    setBets([]);
  }
}
