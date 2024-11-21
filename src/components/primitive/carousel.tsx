"use client";

import Flickity, { type Options } from "flickity";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type CarouselProps = ComponentPropsWithoutRef<"div"> & {
  options?: Options;
  flickityRef?: (instance: Flickity) => void;
};

export default function Carousel(props: CarouselProps) {
  const { options, children, className, flickityRef, ...attrs } = props;

  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flickity = new Flickity(target.current!, options);

    flickityRef?.(flickity);

    return function cancel() {
      flickity.destroy();
    };
    // eslint-disable-next-line -- -
  }, []);

  return (
    <div {...attrs} className={twMerge("relative focus:outline-none", className)} ref={target}>
      {children}
    </div>
  );
}
