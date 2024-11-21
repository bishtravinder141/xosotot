"use client";

import dices from "@assets/images/lottery/k3-lotre/dices.png";
import { forwardRef } from "react";

type LotteryDiceProps = {
  size: number;
  value: number;
  offset: number;
  className?: string;
};

const LotteryDice = forwardRef<HTMLDivElement, LotteryDiceProps>(function LotteryDice(props, ref) {
  const size = props.size / 4;
  const value = (props.value - 1) % 6;
  const offset = (props.offset - 1) % 6;

  return (
    <div
      className={props.className}
      ref={ref}
      style={{
        backgroundSize: `${props.size}rem`,
        backgroundImage: `url(${dices.src})`,
        backgroundPositionX: `${offset * -size}rem`,
        backgroundPositionY: `${value * -size}rem`,
      }}
    />
  );
});

export default LotteryDice;
