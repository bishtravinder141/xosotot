"use client";

import { useLotteryBets } from "@components/primitive/lottery";
import { LOTTERY_COLORS, LOTTERY_NUMBERS, LOTTERY_SIZES } from "@config/lottery";

export default function LotteryTrxHashBet() {
  const [bets] = useLotteryBets();

  const size = LOTTERY_SIZES.find((item) => item.value.toString() === bets[0]?.value);
  const color = LOTTERY_COLORS.find((item) => item.value.toString() === bets[0]?.value);
  const number = LOTTERY_NUMBERS.find((item) => item.value.toString() === bets[0]?.value);

  return (
    <>
      {size && (
        <>
          <input name="gametype" type="hidden" value="2" />
          <input name="selecttype" type="hidden" value={size.value} />
        </>
      )}
      {color && (
        <>
          <input name="gametype" type="hidden" value="0" />
          <input name="selecttype" type="hidden" value={color.value} />
        </>
      )}
      {number && (
        <>
          <input name="gametype" type="hidden" value="1" />
          <input name="selecttype" type="hidden" value={number.value} />
        </>
      )}
    </>
  );
}
