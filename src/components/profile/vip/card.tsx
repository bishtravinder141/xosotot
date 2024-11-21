"use client";

import ProfileAdvance from "@components/profile/advance";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

type VipCardProps = {
  level: number;
  className?: string;
  experience: {
    to: number;
    from: number;
    current: number;
  };

  track: {
    background: string;
  };
  message: {
    background: string;
  };
  background: string;
};

export default function VipCard(props: VipCardProps) {
  const t = useTranslations();

  const remains = props.experience.to - props.experience.current;
  const percent = (remains / (props.experience.to - props.experience.from)) * 100;

  return (
    <div
      className={twMerge(props.className, "flex w-80 gap-3 rounded-2xl px-4 py-2 text-[0.5rem] text-white")}
      style={{ backgroundImage: `url(${props.background})` }}
    >
      <div className="flex grow flex-col gap-2.5 py-1">
        <strong className="text-base">{`VIP ${props.level}`}</strong>

        <p className="mr-3">
          {`${t("Upgrading VIP {level} requires", { level: props.level })} `}
          <span className="whitespace-nowrap">
            {remains.toLocaleString("en", { maximumFractionDigits: 0 }).replaceAll(",", " ")}
          </span>
          <br />
          {`EXP ${t("Bet")} 1000 = 1 EXP`}
        </p>

        <div className="relative mt-auto">
          <div
            className="absolute bottom-full z-[10] mb-1.5 -translate-x-1/2 rounded-full bg-white text-black after:absolute after:bottom-0 after:left-1/2 after:size-1 after:-translate-x-1/2 after:translate-y-1/2 after:rotate-45 after:bg-inherit"
            style={{ left: `${Math.min(80, Math.max(15, 100 - percent - 2))}%` }}
          >
            <p className="whitespace-nowrap px-1.5 py-1">{`${props.experience.current.toLocaleString("en", { maximumFractionDigits: 0 }).replaceAll(",", " ")} / ${props.experience.to.toLocaleString("en", { maximumFractionDigits: 0 }).replaceAll(",", " ")}`}</p>
          </div>

          <div className="relative h-2 overflow-hidden rounded-full">
            <div className="h-full bg-white shadow-[inset_0_4px_4px_rgb(0_0_0/.25)]" />
            <div
              className="absolute inset-0 rounded-full shadow-[inset_0_-1px_4px_rgb(0_0_0/.25)]"
              style={{ background: props.track.background, transform: `translateX(-${percent}%)` }}
            />
          </div>
        </div>
      </div>

      <div className="flex w-24 flex-col items-center gap-2.5 pb-1">
        <ProfileAdvance level={props.level} size={82} />

        <p
          className="relative rounded-lg p-1 text-center before:absolute before:left-1/2 before:top-0 before:size-1.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-inherit"
          style={{ background: props.message.background }}
        >
          {`${(props.experience.to - props.experience.from).toLocaleString("en").replaceAll(",", " ")} EXP`}
          <br />
          {t("can be leveled up")}
        </p>
      </div>
    </div>
  );
}
