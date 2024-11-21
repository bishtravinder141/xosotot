"use client";

import { random } from "@lib/utils";
import { useEffect, useState } from "react";
import SlotCounter from "react-slot-counter";

type AutoincrementSlotCounterProps = {
  step: [number, number];
  value: number;
  interval: [number, number];
};

export default function AutoincrementSlotCounter(props: AutoincrementSlotCounterProps) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const update = () => {
      setValue((state) => state + random.apply(0, props.step));

      timer = setTimeout(update, random.apply(0, props.interval));
    };

    update();

    return function cancel() {
      clearTimeout(timer);
    };
  }, [props.step, props.interval]);

  return <SlotCounter autoAnimationStart={false} sequentialAnimationMode value={value} />;
}
