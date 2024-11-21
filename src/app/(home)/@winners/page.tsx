import confetti from "@assets/images/general/confetti.webp";
import cup from "@assets/images/home/cup.png";
import copper from "@assets/images/winner/copper-crown.webp";
import gold from "@assets/images/winner/gold-crown.webp";
import silver from "@assets/images/winner/silver-crown.webp";
import CashLine from "@components/icon/ri/cash-line";
import { getTopWithdrawals } from "@data/withdrawals";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextImage from "next/image";

export default async function HomeWinnersSlot() {
  const t = await getTranslations();
  const withdrawals = await getTopWithdrawals();

  if (withdrawals.length < 3) {
    return null;
  }

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-500">
        {t("Top winners")}
        <NextImage alt="Cup" className="size-7 shrink-0" height={28} src={cup} width={28} />
      </h2>

      <div className="relative -mx-5">
        <div className="absolute inset-x-0 -top-5 h-24 bg-gradient-to-b from-white">
          <NextImage alt="Confetti" className="absolute inset-x-0 top-0 -z-[1]" src={confetti} />
        </div>

        <div className="relative z-[1] -mb-px pt-20">
          <div className="relative z-10 mx-auto flex max-w-96 justify-between px-[clamp(0.75rem,5vw,1.25rem)] pb-2 text-center text-[0.625rem] font-bold leading-none">
            <div className="-mb-[clamp(5rem,25vw,6.8rem)] mt-[clamp(5rem,25vw,6.8rem)] flex flex-col items-center gap-2">
              <div className="relative size-24 rounded-full bg-gray-200">
                <NextImage
                  alt={withdrawals[2].user.name}
                  className="rounded-full object-cover"
                  fill
                  src={withdrawals[2].user.avatar}
                />
                <div className="absolute right-1 top-1 w-14 -translate-y-1/2 translate-x-1/4 rotate-[35deg]">
                  <NextImage alt="Copper Crown" className="object-contain" src={copper} />
                </div>
              </div>
              <figcaption className="flex w-24 flex-col items-center gap-1">
                <span className="truncate">{withdrawals[2].user.name}</span>
                <span className="flex items-center gap-1">
                  <CashLine className="text-green-600" size={rem(12)} />
                  <small className="truncate">
                    {format(withdrawals[2].amount, {
                      style: "currency",
                    })}
                  </small>
                </span>
              </figcaption>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative size-24 rounded-full bg-gray-200">
                <NextImage
                  alt={withdrawals[0].user.name}
                  className="rounded-full object-cover"
                  fill
                  src={withdrawals[0].user.avatar}
                />
                <div className="absolute right-1 top-1 w-14 -translate-y-1/2 translate-x-1/4 rotate-[35deg]">
                  <NextImage alt="Gold Crown" className="object-contain" src={gold} />
                </div>
              </div>
              <div className="flex w-24 flex-col items-center gap-1">
                <span className="truncate">{withdrawals[0].user.name}</span>
                <span className="flex items-center gap-1">
                  <CashLine className="text-green-600" size={rem(12)} />
                  <small className="truncate">
                    {format(withdrawals[0].amount, {
                      style: "currency",
                    })}
                  </small>
                </span>
              </div>
            </div>
            <div className="-mb-[clamp(5rem,22vw,6rem)] mt-[clamp(5rem,22vw,6rem)] flex flex-col items-center gap-2">
              <div className="relative size-24 rounded-full bg-gray-200">
                <NextImage
                  alt={withdrawals[1].user.name}
                  className="rounded-full object-cover"
                  fill
                  src={withdrawals[1].user.avatar}
                />
                <div className="absolute right-1 top-1 w-14 -translate-y-1/2 translate-x-1/4 rotate-[35deg]">
                  <NextImage alt="Silver Crown" className="object-contain" src={silver} />
                </div>
              </div>
              <div className="flex w-24 flex-col items-center gap-1">
                <span className="truncate">{withdrawals[1].user.name}</span>
                <span className="flex items-center gap-1">
                  <CashLine className="text-green-600" size={rem(12)} />
                  <small className="truncate">
                    {format(withdrawals[1].amount, {
                      style: "currency",
                    })}
                  </small>
                </span>
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

        {withdrawals.length > 3 && (
          <div className="flex flex-col divide-y divide-white">
            {withdrawals.slice(3, 5).map((withdrawal, index) => (
              <div
                className="relative flex justify-between gap-3 bg-red-300 bg-card-confetti bg-full bg-center px-8 py-3 text-white"
                key={withdrawal.id}
              >
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-red-300">
                  <span className="burbank-big-condensed-black text-2xl font-black">{index + 4}</span>
                </div>

                <div className="relative flex items-center gap-3 text-xs tracking-wide">
                  <NextImage
                    alt={withdrawal.user.name}
                    className="-ml-3 -mr-1 shrink-0 rounded-full"
                    height={28}
                    src={withdrawal.user.avatar}
                    width={28}
                  />

                  <div className="flex flex-col gap-1">
                    <span>{withdrawal.user.name}</span>
                    <div className="flex items-center gap-1">
                      <CashLine size={rem(16)} />
                      <span className="text-xs font-bold leading-none">
                        {format(withdrawal.amount, {
                          style: "currency",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-10 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
