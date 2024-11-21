import confetti from "@assets/images/general/confetti.png";
import cup from "@assets/images/home/cup.png";
import copper from "@assets/images/winner/copper-crown.png";
import gold from "@assets/images/winner/gold-crown.png";
import silver from "@assets/images/winner/silver-crown.png";
import Skeleton from "@components/shared/skeleton";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function HomeWinnersSlotLoading() {
  const t = await getTranslations();

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-500">
        {t("Top winners")}
        <NextImage alt="Cup" className="size-7 shrink-0" height={28} src={cup} width={28} />
      </h2>

      <div className="relative -mx-5">
        <div className="absolute inset-x-0 -top-6 h-24 bg-gradient-to-b from-white">
          <NextImage alt="Confetti" className="absolute inset-x-0 top-0 -z-[1]" src={confetti} />
        </div>

        <div className="relative z-[1] -mb-px pt-20">
          <div className="relative z-10 mx-auto flex max-w-96 justify-between px-[clamp(0.75rem,5vw,1.25rem)] pb-2 text-center text-sm font-bold leading-none">
            <div className="-mb-[clamp(5rem,25vw,6.8rem)] mt-[clamp(5rem,25vw,6.8rem)] flex flex-col items-center gap-2">
              <div className="relative size-24 rounded-full bg-gray-200">
                <NextImage
                  alt="Copper Crown"
                  className="absolute right-1 top-0 -translate-y-1/2 translate-x-1/4"
                  height={75}
                  src={copper}
                  width={75}
                />
                <Skeleton className="size-24 rounded-full" />
              </div>
              <div className="flex w-24 flex-col gap-1">
                <Skeleton className="h-3 rounded" />
                <Skeleton className="h-2.5 rounded" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative size-24 rounded-full bg-gray-200">
                <NextImage
                  alt="Gold Crown"
                  className="absolute right-1 top-0 -translate-y-1/2 translate-x-1/4"
                  height={75}
                  src={gold}
                  width={75}
                />
                <Skeleton className="size-24 rounded-full" />
              </div>
              <div className="flex w-24 flex-col gap-1">
                <Skeleton className="h-3 rounded" />
                <Skeleton className="h-2.5 rounded" />
              </div>
            </div>
            <div className="-mb-[clamp(5rem,22vw,6rem)] mt-[clamp(5rem,22vw,6rem)] flex flex-col items-center gap-2">
              <div className="relative size-24 rounded-full bg-gray-200">
                <NextImage
                  alt="Silver Crown"
                  className="absolute right-1 top-0 -translate-y-1/2 translate-x-1/4"
                  height={75}
                  src={silver}
                  width={75}
                />
                <Skeleton className="size-24 rounded-full" />
              </div>
              <div className="flex w-24 flex-col gap-1">
                <Skeleton className="h-3 rounded" />
                <Skeleton className="h-2.5 rounded" />
              </div>
            </div>
          </div>

          <svg className="-z-[1]" fill="none" viewBox="10 0 377 204">
            <g className="fill-red-300">
              <path d="M345.368 91.7928L333.544 168.65H61.2775L50.0757 102.372L134.089 97.0826L155.871 3.42278L240.818 0L254.82 89.3035L345.368 91.7928Z" />
            </g>
            <g className="fill-red-400">
              <path d="M340.701 168.65L343.813 174.251L51.6315 173.94L55.0543 168.65H340.701Z" />
            </g>
            <g className="fill-red-500">
              <path d="M364.972 173.94L379.908 197.277H14.6032L28.9167 173.94H364.972Z" />
            </g>
            <g className="fill-red-600">
              <path d="M0.912079 203.5L6.82416 195.099L389.554 196.966L396.088 203.5H0.912079Z" />
            </g>
            <g fill="white" opacity="0.1">
              <path d="M314.657 90.9485L290.657 203.5H210.282L260.11 89.926H277.461L314.657 90.9485Z" />
              <path d="M245.132 27.5106L186.468 203.5H81.4976L202.428 1.54687L233.093 0.311279H240.867L245.132 27.5106Z" />
            </g>
            <g className="text-[2.75em] font-bold" dominantBaseline="middle" fill="white" textAnchor="middle">
              <text x="95" y="140">
                3
              </text>
              <text x="195" y="55">
                1
              </text>
              <text x="290" y="125">
                2
              </text>
            </g>
          </svg>
        </div>

        <div className="flex flex-col divide-y divide-white">
          {Array.from(Array(2)).map((_, index) => (
            <div
              className="relative flex justify-between gap-3 bg-red-300 bg-card-confetti bg-full bg-center px-8 py-3 text-white"
              // eslint-disable-next-line react/no-array-index-key -- -
              key={index}
            >
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-red-300">
                <span className="burbank-big-condensed-black text-2xl font-black">{index + 4}</span>
              </div>

              <div className="relative flex items-center gap-3 text-xs tracking-wide">
                <div className="flex w-40 shrink-0 flex-col gap-1">
                  <Skeleton className="h-4 rounded" />
                  <Skeleton className="h-3 rounded" />
                </div>
              </div>

              <div className="w-10 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
