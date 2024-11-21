"use client";

import { revalidate } from "@action/lottery/revalidate";
import { useNow } from "@components/primitive/time";
import { getLotteryExpired } from "@lib/lottery";
import { useEffect } from "react";

type HistoryUpdatePluginProps = {
  period: number;
};

export default function HistoryUpdatePlugin(props: HistoryUpdatePluginProps) {
  const time = useNow({ interval: 1000 }).getTime();

  const expired = getLotteryExpired(time, props.period);
  const seconds = Math.max(Math.ceil((expired - time) / 1000) - 1, 0);

  useEffect(() => {
    if (seconds < 1) {
      void revalidate();
    }
  }, [seconds]);

  return null;
}
