"use client";

import Carousel from "@components/primitive/carousel";
import { TabsTrigger } from "@components/primitive/tabs";
import dayjs from "@lib/dayjs";
import type Flickity from "flickity";
import type { Options } from "flickity";
import { useState } from "react";

const carousel: Options = {
  contain: true,
  pageDots: false,
  cellAlign: "center",
  percentPosition: true,
  prevNextButtons: false,
};

type DayCarouselProps = {
  dates: string[];
  locale: string;
};

export default function DayCarousel(props: DayCarouselProps) {
  const [ref, setRef] = useState<Flickity>();

  return (
    <Carousel className="-mx-1" flickityRef={setRef} options={carousel}>
      {props.dates.map((date, index) => (
        <div className="w-1/3 px-1" key={date}>
          <TabsTrigger
            className="flex w-full cursor-pointer flex-col items-center gap-0.5 rounded bg-red-100 p-4 text-[0.625rem] text-white transition-colors data-[state=selected]:bg-red-300"
            onClick={() => {
              ref?.select(index);
            }}
            value={date}
          >
            <strong>{new Date(date).toLocaleString(props.locale, { weekday: "long" })}</strong>
            <span>{dayjs(date).format("YYYY-MM-DD")}</span>
          </TabsTrigger>
        </div>
      ))}
    </Carousel>
  );
}
