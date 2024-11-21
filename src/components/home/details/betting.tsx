import AutoincrementSlotCounter from "@components/home/details/autoincrement-slot-counter";
import Skeleton from "@components/shared/skeleton";
import { getDetails } from "@data/details";
import dynamic from "next/dynamic";

async function HomeDetailsBetting() {
  const details = await getDetails();

  return (
    <strong className="font-bold">
      <AutoincrementSlotCounter interval={[1000, 1000]} step={[0, 15]} value={details.total_bettings} />
    </strong>
  );
}

export default dynamic(() => Promise.resolve(HomeDetailsBetting), {
  loading: () => <Skeleton className="h-5 w-20 rounded-md" />,
  ssr: false,
});
