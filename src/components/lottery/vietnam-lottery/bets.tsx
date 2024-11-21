import Check from "@components/icon/custom/check";
import Ball from "@components/icon/xosotot/ball";
import VietnamLotteryFilterTrigger from "@components/lottery/vietnam-lottery/filter-trigger";
import { LotteryBetTrigger } from "@components/primitive/lottery";
import { TabsContent } from "@components/primitive/tabs";
import { LOTTERY_NUMBERS, LOTTERY_SIZES, LOTTERY_TYPES } from "@config/lottery";
import { getVietnamLotteryAreas, getVietnamLotteryCities } from "@data/lottery/vietnam-lottery";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";

type LotteryVietnamLotteryBetsProps = {
  area?: string;
  city?: string;
};

export async function LotteryVietnamLotteryBets(props: LotteryVietnamLotteryBetsProps) {
  const t = await getTranslations();
  const aries = await getVietnamLotteryAreas().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (aries === null) {
    return null;
  }

  const area = aries.find((item) => !props.area || item.id.toString() === props.area)!;

  const cities = await getVietnamLotteryCities(area.id);

  return (
    <>
      <div className="!mt-0 flex flex-col gap-2.5 rounded-b-md bg-red-300 p-2.5 text-white [&_hr]:border-white">
        {"123456".split("").map((group, index) => (
          <TabsContent key={group} value={index.toString()}>
            <div className="-mx-2.5 flex gap-2 overflow-x-auto px-2.5">
              {aries.map((item) => (
                <VietnamLotteryFilterTrigger
                  active={item.id === area.id}
                  key={item.id}
                  name="area"
                  only={["area"]}
                  value={item.id.toString()}
                >
                  {item.name.toLowerCase()}
                </VietnamLotteryFilterTrigger>
              ))}
            </div>

            {cities.length > 0 && (
              <>
                <hr />

                <div className="-mx-2.5 flex gap-2 overflow-x-auto px-2.5">
                  {cities.map((item, j) => (
                    <VietnamLotteryFilterTrigger
                      active={props.city ? item.id.toString() === props.city : j < 1}
                      key={item.id}
                      name="city"
                      value={item.id.toString()}
                    >
                      {item.name.toLowerCase()}
                    </VietnamLotteryFilterTrigger>
                  ))}
                </div>

                <hr />

                <div className="flex gap-1">
                  {LOTTERY_SIZES.map((size) => (
                    <LotteryBetTrigger
                      className="group flex w-0 grow flex-col gap-1.5 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                      key={group + size.value}
                      type={`:${group}:`}
                      value={size.value}
                    >
                      <small className="text-[0.5rem] text-gray-800">
                        {`${t("Odds")} x${format(2, {
                          style: "decimal",
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 2,
                        })}`}
                      </small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {t(size.name)}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </LotteryBetTrigger>
                  ))}
                  {LOTTERY_TYPES.map((type) => (
                    <LotteryBetTrigger
                      className="group flex w-0 grow flex-col gap-1.5 rounded bg-white p-1.5 text-xs leading-none text-red-300"
                      key={group + type.value}
                      type={`:${group}:`}
                      value={type.value}
                    >
                      <small className="text-[0.5rem] text-gray-800">
                        {`${t("Odds")} x${format(2, {
                          style: "decimal",
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 2,
                        })}`}
                      </small>
                      <p className="flex w-full items-center justify-between font-bold">
                        {t(type.name)}
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-red-300">
                          <span className="size-2.5 rounded-full bg-transparent transition-colors group-data-[state=active]:bg-red-300" />
                        </span>
                      </p>
                    </LotteryBetTrigger>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        ))}
      </div>

      {cities.length > 0 && (
        <div className="grid grid-cols-[repeat(5,60px)] justify-between gap-y-3">
          {"123456".split("").map((group, index) => (
            <TabsContent key={group} value={index.toString()}>
              {LOTTERY_NUMBERS.map((number) => (
                <div className="relative flex flex-col items-center" key={group + number.value}>
                  <LotteryBetTrigger
                    attach
                    className="group relative inline-flex overflow-hidden rounded-lg bg-transparent p-1.5 transition-colors data-[state=active]:bg-red-300 data-[state=selected]:bg-red-100"
                    type={group}
                    value={number.value.toString()}
                  >
                    <Ball color="black">{number.value}</Ball>
                    <span className="absolute bottom-0 right-0 rounded-tl bg-green-800 p-0.5 text-white opacity-0 transition-opacity group-data-[state=active]:opacity-100">
                      <Check size={rem(7)} />
                    </span>
                  </LotteryBetTrigger>
                  <span className="-mt-1.5 text-[0.375rem] leading-none">x9.8</span>
                </div>
              ))}
            </TabsContent>
          ))}
        </div>
      )}

      {cities.length < 1 && (
        <div className="flex justify-center rounded-md bg-red-50 px-5 py-9">
          <p className="w-9/12 text-center font-bold">{t("No bets will be accepted at this time")}</p>
        </div>
      )}
    </>
  );
}
