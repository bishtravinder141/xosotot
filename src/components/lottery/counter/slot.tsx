"use client";

import Ball from "@components/icon/xosotot/ball";
import { useNow } from "@components/primitive/time";
import usePageVisibility from "@hooks/page-visibility";
import { getLotteryExpired } from "@lib/lottery";
import { gsap } from "gsap";
import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";

type LotterySlotCounterProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  value: number;
  delay?: number;
  period: number;
  winner: number;
};

export default function LotterySlotCounter(props: LotterySlotCounterProps) {
  const { winner, value, delay: _delay = 0, period, ...attrs } = props;

  const data = useRef({
    id: props.winner,
    value,
  });

  const slots = useRef<HTMLDivElement[]>([]);
  const animation = useRef<ReturnType<typeof gsap.timeline> | null>(null);

  const time = useNow({ interval: 1000 }).getTime();
  const visible = usePageVisibility();

  const expired = getLotteryExpired(time, period);
  const seconds = Math.max(Math.ceil((expired - time) / 1000) - 1, 0);

  const ref = (index: number) => (el: HTMLDivElement) => {
    slots.current[index] = el;
  };

  useEffect(() => {
    if (seconds > 0 || !visible) {
      return;
    }

    animation.current?.kill();

    animation.current = gsap.timeline();

    animation.current.add(start(slots.current));
    animation.current.add(loop(slots.current));
    animation.current.add(end(slots.current, data.current.value));

    // eslint-disable-next-line -- -
  }, [seconds]);

  useEffect(() => {
    if (data.current.id === props.winner) {
      return;
    }

    data.current = {
      id: props.winner,
      value,
    };

    if (visible) {
      animation.current?.remove(animation.current.getById("end"));

      animation.current?.add(end(slots.current, props.value));
    } else if (slots.current.length > 0) {
      animation.current?.kill();

      slots.current.forEach((slot) => {
        slot.style.transform = `translate(0, ${-props.value * 100 - 65}%)`;
      });
    }

    // eslint-disable-next-line -- -
  }, [winner]);

  return (
    <div {...attrs}>
      {Array.from(Array(12)).map((_, index) => (
        <div
          className="p-1 transition-opacity duration-200"
          // eslint-disable-next-line react/no-array-index-key -- -
          key={index}
          ref={ref(index)}
          style={{ transform: `translate(0, ${-data.current.value * 100 - 65}%)` }}
        >
          <Ball color="black">{(index + 9) % 10}</Ball>
        </div>
      ))}
    </div>
  );
}

function start(targets: gsap.TweenTarget) {
  const timeline = gsap.timeline();

  timeline.to(targets, {
    y: "-=1000%",
    ease: "power1.in",
    duration: 0.5,
    modifiers: {
      y: gsap.utils.unitize((offset) => offset % 1000),
    },
  });

  return timeline;
}

function loop(targets: gsap.TweenTarget) {
  const timeline = gsap.timeline({
    repeat: 2,
  });

  timeline.to(targets, {
    y: "-=1000%",
    ease: "none",
    duration: 0.5,
    modifiers: {
      y: gsap.utils.unitize((offset) => offset % 1000),
    },
  });

  return timeline;
}

function end(targets: gsap.TweenTarget, position: number) {
  const timeline = gsap.timeline({
    id: "end",
  });

  timeline.to(targets, {
    y: `-1${position}65%`,
    ease: "power1.out",
    duration: 0.5,
    modifiers: {
      y: gsap.utils.unitize((offset) => offset % 1000),
    },
  });

  return timeline;
}
