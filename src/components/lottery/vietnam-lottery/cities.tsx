import VietnamLotteryTicket from "@components/lottery/vietnam-lottery/ticket";
import { TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import { getVietnamLotteryCities } from "@data/lottery/vietnam-lottery";

type VietnamLotteryCitiesProps = {
  area: number;
  date: string;
};

export default async function VietnamLotteryCities(props: VietnamLotteryCitiesProps) {
  const cities = await getVietnamLotteryCities(props.area);

  return (
    <TabsProvider>
      <div className="grid grid-cols-2 gap-5">
        {cities
          .filter((city) => city.date === props.date)
          .map((city) => (
            <TabsTrigger
              className="group flex flex-col gap-2.5 data-[state=selected]:col-span-full"
              key={city.id}
              value={city.id.toString()}
            >
              <VietnamLotteryTicket area={props.area} city={{ id: city.id, name: city.name, date: city.date }} />
            </TabsTrigger>
          ))}
      </div>
    </TabsProvider>
  );
}
