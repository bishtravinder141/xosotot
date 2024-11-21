import notebook from "@assets/images/general/notebook.png";
import VietnamLotteryTicket from "@components/lottery/vietnam-lottery/ticket";
import AutoLogout from "@components/plugin/auto-logout";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import Skeleton from "@components/shared/skeleton";
import { getVietnamLotteryAreas, getVietnamLotteryCities } from "@data/lottery/vietnam-lottery";
import { getUserinfo } from "@data/profile";
import { UnauthorizedError } from "@lib/error";
import { getLocale, getTranslations } from "@lib/translation";
import dynamic from "next/dynamic";
import NextImage from "next/image";

const DayCarousel = dynamic(() => import("@components/lottery/vietnam-lottery/day-carousel"), {
  loading: () => (
    <div className="flex gap-2.5">
      <Skeleton className="h-16 flex-1 rounded" />
      <Skeleton className="h-16 flex-1 rounded" />
      <Skeleton className="h-16 flex-1 rounded" />
    </div>
  ),
  ssr: false,
});

export default async function VietnamLotteryPage() {
  const locale = getLocale();
  const t = await getTranslations();

  const userinfo = await getUserinfo().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }
    throw error;
  });

  if (userinfo === null) {
    return <AutoLogout message={t("You are logged in from another device")} />;
  }

  const areas = await getVietnamLotteryAreas().then((items) =>
    Promise.all(items.map((item) => getAreaWithCities(item))),
  );

  const dates = areas.reduce<string[]>((acc, area) => {
    for (const city of area.cities) {
      if (!acc.includes(city.date)) {
        acc.push(city.date);
      }
    }

    return acc;
  }, []);

  const initial = (date: string) => areas.find((item) => getAreaCitiesByDay(item.cities, date).length > 0);

  return (
    <>
      {dates.length > 0 ? (
        <TabsProvider initial={dates[0]}>
          <DayCarousel dates={dates} locale={locale} />
          {dates.map((date) => (
            <TabsContent key={date} value={date}>
              <TabsProvider initial={initial(date)?.id.toString()}>
                <div className="flex gap-2.5">
                  {areas.map((area) =>
                    getAreaCitiesByDay(area.cities, date).length < 1 ? null : (
                      <TabsTrigger
                        className="group flex w-0 grow items-center justify-center gap-1.5 rounded bg-red-300 px-8 py-4 text-[0.625rem] font-bold leading-3 text-white"
                        key={area.id}
                        value={area.id.toString()}
                      >
                        <span className="inline-flex rounded-full p-0.5 ring-1 ring-white">
                          <span className="size-2 rounded-full bg-transparent transition-colors group-data-[state=selected]:bg-white" />
                        </span>
                        {area.name}
                      </TabsTrigger>
                    ),
                  )}
                </div>
                {areas.map((area) => {
                  const cities = getAreaCitiesByDay(area.cities, date);

                  return cities.length < 1 ? null : (
                    <TabsContent key={area.id} value={area.id.toString()}>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-4">
                          <strong>{t("City")}</strong>
                        </div>
                        <TabsProvider>
                          <div className="grid grid-cols-2 gap-5">
                            {cities.map((city) => (
                              <TabsTrigger
                                className="group flex flex-col gap-2.5 data-[state=selected]:col-span-full"
                                key={city.id}
                                value={city.id.toString()}
                              >
                                <VietnamLotteryTicket
                                  area={area.id}
                                  city={{ id: city.id, name: city.name, date: city.date }}
                                />
                              </TabsTrigger>
                            ))}
                          </div>
                        </TabsProvider>
                      </div>
                    </TabsContent>
                  );
                })}
              </TabsProvider>
            </TabsContent>
          ))}
        </TabsProvider>
      ) : (
        <div className="flex flex-col items-center gap-3 py-3">
          <NextImage alt="Notebook" className="max-w-24" src={notebook} />
          <p className="text-[0.625rem]">{t("Coming soon")}</p>
        </div>
      )}
    </>
  );
}

async function getAreaWithCities(area: { id: number; name: string }) {
  const cities = await getVietnamLotteryCities(area.id);
  return { ...area, cities };
}

function getAreaCitiesByDay<T extends { date: string }[]>(cities: T, date: string): T {
  return cities.filter((city) => city.date === date) as T;
}
