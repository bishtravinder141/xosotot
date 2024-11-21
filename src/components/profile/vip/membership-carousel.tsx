"use client";

import Carousel from "@components/primitive/carousel";
import { useTabs } from "@components/primitive/tabs";
import CopperVipCard from "@components/profile/vip/copper-card";
import GoldVipCard from "@components/profile/vip/gold-card";
import SilverVipCard from "@components/profile/vip/silver-card";
import type { Membership } from "@data/membership";
import type Flickity from "flickity";
import type { Options } from "flickity";

const carousel: Options = {
  contain: true,
  pageDots: false,
  cellAlign: "center",
  percentPosition: true,
  prevNextButtons: false,
};

type DayCarouselProps = {
  details: {
    exp: number;
    level: number;
  };
  memberships: (Membership & { level: number })[];
};

export default function MembershipCarousel(props: DayCarouselProps) {
  const [_tab, setTab] = useTabs();

  const on: Options["on"] = {
    change(index) {
      setTab(props.memberships[index].level.toString());
    },

    staticClick(this: Flickity, _, __, ___, index) {
      this.select(index);
    },
  };

  return (
    <Carousel className="-ml-1.5" options={{ on, ...carousel }}>
      {props.memberships.map((membership) => {
        const level = membership.level;
        const experience = {
          to: membership.exp_to,
          from: membership.exp_from,
          current: props.details.exp,
        };

        return (
          <div className="p-1.5" key={membership.level}>
            {level > 6 && (
              <GoldVipCard
                className="h-full shrink-0 ring-blue-500 ring-offset-1 flickity-is-selected:ring-2"
                experience={experience}
                key={level}
                level={level}
              />
            )}
            {level > 3 && level < 7 && (
              <SilverVipCard
                className="h-full shrink-0 ring-blue-500 ring-offset-1 flickity-is-selected:ring-2"
                experience={experience}
                key={level}
                level={level}
              />
            )}
            {level >= props.details.level && level < 4 && (
              <CopperVipCard
                className="h-full shrink-0 ring-blue-500 ring-offset-1 flickity-is-selected:ring-2"
                experience={experience}
                key={level}
                level={level}
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
}
