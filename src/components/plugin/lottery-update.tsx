"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import { useNow } from "@components/primitive/time";
import { getLotteryExpired } from "@lib/lottery";
import { useEffect } from "react";

type LotteryUpdatePluginProps =
  | {
      locked?: number;
      period?: never;
      expired: number;
    }
  | {
      locked?: never;
      period: number;
      expired?: never;
    };

export default function LotteryUpdatePlugin(props: LotteryUpdatePluginProps) {
  const time = useNow({ interval: 1000 }).getTime();
  const [_bets, setBets] = useLotteryBets();

  const expired = props.expired ?? getLotteryExpired(time, props.period);
  const locked = props.locked ?? expired - 5_000;

  useEffect(() => {
    if (locked - time < 0) {
      setBets([]);
    }
  }, [locked, setBets, time]);

  return null;
}
