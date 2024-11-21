"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import { getK3LotreBets } from "@lib/lottery";

export default function LotteryK3LotreBet() {
  const [bets] = useLotteryBets();
  const k3Bets = getK3LotreBets(bets);

  if (k3Bets.length < 1) {
    return null;
  }

  return (
    <>
      <input name="gametype" type="hidden" value={k3Bets.map((item) => item.type).join(",")} />
      <input name="selecttype" type="hidden" value={k3Bets.map((item) => item.value).join(",")} />
    </>
  );
}
