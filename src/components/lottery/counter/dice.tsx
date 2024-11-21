"use client";

import LotteryDice from "@components/lottery/k3/dice";
import { useNow } from "@components/primitive/time";
import usePageVisibility from "@hooks/page-visibility";
import { getLotteryExpired } from "@lib/lottery";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type LotteryDiceCounterProps = {
  value: number;
  delay?: number;
  offset: number;
  period: number;
  winner: number;
};

export default function LotteryDiceCounter(props: LotteryDiceCounterProps) {
  const data = useRef({
    id: props.winner,
    value: props.value,
    offset: props.offset,
  });

  const dice = useRef<HTMLDivElement>(null);
  const animation = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  const time = useNow({ interval: 1000 }).getTime();
  const visible = usePageVisibility();

  const expired = getLotteryExpired(time, props.period);
  const seconds = Math.max(Math.ceil((expired - time) / 1000) - 1, 0);

  useEffect(() => {
    if (seconds > 0 || !visible) {
      return;
    }

    animation.current?.kill();

    animation.current = gsap.timeline();

    animation.current.add(start(dice.current));
    animation.current.add(loop(dice.current));
    animation.current.add(end(dice.current, data.current.value - 1, data.current.offset - 1));

    // eslint-disable-next-line -- -
  }, [seconds]);

  useEffect(() => {
    if (data.current.id === props.winner) {
      return;
    }

    data.current = {
      id: props.winner,
      value: props.value,
      offset: props.offset,
    };

    if (visible) {
      animation.current?.remove(animation.current.getById("end"));

      animation.current?.add(end(dice.current, props.value - 1, props.offset - 1));
    } else if (dice.current) {
      animation.current?.kill();

      dice.current.style.backgroundPositionX = `${(props.offset - 1) * -4}rem`;
      dice.current.style.backgroundPositionY = `${(props.value - 1 + 6) * -4}rem`;
    }

    // eslint-disable-next-line -- -
  }, [props.winner]);

  return <LotteryDice className="size-16 shrink-0" offset={props.offset} ref={dice} size={16} value={props.value} />;
}

function start(targets: gsap.TweenTarget) {
  const timeline = gsap.timeline();

  timeline.to(targets, {
    ease: "power1.in",
    duration: 0.5,

    snap: {
      backgroundPositionX: 4,
      backgroundPositionY: 4,
    },

    backgroundPositionX: `-=${4 * 4}rem`,
    backgroundPositionY: `-=${6 * 4}rem`,
  });

  return timeline;
}

function loop(targets: gsap.TweenTarget) {
  const timeline = gsap.timeline({
    repeat: 2,
  });

  timeline.to(targets, {
    ease: "none",
    duration: 0.5,

    snap: {
      backgroundPositionX: 4,
      backgroundPositionY: 4,
    },

    backgroundPositionX: `-=${4 * 4}rem`,
    backgroundPositionY: `-=${6 * 4}rem`,
  });

  return timeline;
}

function end(targets: gsap.TweenTarget, value: number, offset: number) {
  const timeline = gsap.timeline({
    id: "end",
  });

  timeline.to(targets, {
    ease: "power1.out",
    duration: 0.5,

    snap: {
      backgroundPositionX: 4,
      backgroundPositionY: 4,
    },

    backgroundPositionX: `${offset * -4}rem`,
    backgroundPositionY: `${(value + 6) * -4}rem`,
  });

  return timeline;
}
