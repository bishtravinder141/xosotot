import AutoincrementSlotCounter from "@components/home/details/autoincrement-slot-counter";
import Skeleton from "@components/shared/skeleton";
import { getDetails } from "@data/details";
import dynamic from "next/dynamic";

async function HomeDetailsUsers() {
  const details = await getDetails();

  return (
    <strong className="font-bold">
      <AutoincrementSlotCounter interval={[5000, 20000]} step={[1, 1]} value={details.total_users} />
    </strong>
  );
}

export default dynamic(() => Promise.resolve(HomeDetailsUsers), {
  loading: () => <Skeleton className="h-5 w-14 rounded-md" />,
  ssr: false,
});
