"use client";

import { useEffect, useRef } from "react";

type LotteryCartLineProps = {
  current: number;
  previous: number;
};

export default function LotteryCartLine(props: LotteryCartLineProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(update, [props]);

  useEffect(() => {
    window.addEventListener("resize", update);

    return function cancel() {
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- -
  }, []);

  return (
    <canvas aria-hidden className="pointer-events-none absolute bottom-px mb-1 h-14 w-54 text-red-500" ref={ref} />
  );

  function update() {
    if (!ref.current) {
      return;
    }

    const target = ref.current;
    const parent = target.parentElement;
    const context = target.getContext("2d");

    if (!parent || !context) {
      return;
    }

    const scale = 4;
    target.width = 216 * scale;
    target.height = 50 * scale;

    context.clearRect(0, 0, target.width, target.height);

    if (props.previous < props.current) {
      context.moveTo(getOffset(props.previous) * scale, 2 * scale);
      context.lineTo(getOffset(props.current) * scale, 49 * scale);
    } else {
      context.moveTo(getOffset(props.current) * scale, 49 * scale);
      context.lineTo(getOffset(props.previous) * scale, 2 * scale);
    }

    context.strokeStyle = "#EC4737";
    context.lineWidth = 3 * scale;
    context.stroke();

    return function cancel() {
      target.width = 0;
      target.height = 0;
      target.style.left = "";
      target.style.transform = "";
    };
  }
}

function getOffset(position: number) {
  return position * 20 + 8;
}
