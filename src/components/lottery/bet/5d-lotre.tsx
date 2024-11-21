"use client";

import { useLotteryBets } from "@components/primitive/lottery";

export default function Lottery5DLotreBet() {
  const [bets] = useLotteryBets();

  if (bets.length < 1) {
    return null;
  }

  return (
    <>
      <input name="gametype" type="hidden" value={bets[0].type.replaceAll(":", "")} />
      <input name="selecttype" type="hidden" value={bets.map((item) => item.value).join("|")} />
    </>
  );
}
