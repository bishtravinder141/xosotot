"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Item<T> = {
  value: T;
  label: string;
};

type WheelProps<T> = {
  value: T;
  values: Item<T>[];
  sibling?: number;
  className?: string;

  onChange?: (value: T) => void;
};

export default function Wheel<T>(props: WheelProps<T>) {
  const value = props.values.findIndex((item) => item.value === props.value);
  const sibling = props.sibling || 5;

  const rotate = (position: number, index: number) => {
    const step = 90 / sibling;
    const degree = (-index + position) * step;

    return Math.min(Math.max(degree, -90), 90);
  };

  const [position, setPosition] = useState(value);

  const [ref, slider] = useKeenSlider({
    mode: "free-snap",
    slides: props.values.length,
    initial: value,
    vertical: true,

    dragSpeed(speed) {
      return speed * Math.PI * 2;
    },

    detailsChanged(instance) {
      setPosition(instance.track.details.position);
    },

    animationEnded(instance) {
      props.onChange?.(props.values[instance.track.details.abs].value);
    },
  });

  return (
    <div className={twMerge(props.className, "flex h-[12em]  select-none flex-col overflow-hidden")} ref={ref}>
      <div
        className="pointer-events-none z-[1] grow bg-gradient-to-b from-blue-100 to-transparent"
        style={{ transform: "translateZ(6em)" }}
      />
      <div className="flex h-[2em] flex-col items-center justify-center border-y">
        {props.values.map((item, index) => {
          const style: CSSProperties = {
            transform: `rotateX(${rotate(position, index)}deg) translateZ(6em)`,
            backfaceVisibility: "hidden",
          };

          return (
            <button
              className="absolute flex h-[2em] items-center"
              key={String(item.value)}
              onClick={onClick}
              style={style}
              type="button"
            >
              <span>{item.label}</span>
            </button>
          );

          function onClick() {
            slider.current?.moveToIdx(index);
          }
        })}
      </div>
      <div
        className="pointer-events-none z-[1] grow bg-gradient-to-t from-blue-100 to-transparent"
        style={{ transform: "translateZ(6em)" }}
      />
    </div>
  );
}
