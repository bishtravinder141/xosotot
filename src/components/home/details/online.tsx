import AutoincrementSlotCounter from "@components/home/details/autoincrement-slot-counter";
import Skeleton from "@components/shared/skeleton";
import { DAILY_PERIOD, ONLINE } from "@config/details";
import { random } from "@lib/utils";
import dynamic from "next/dynamic";

function HomeDetailsOnline() {
  const time = Date.now() % DAILY_PERIOD;

  const period = ONLINE.find((item) => {
    const [from, to] = item.time;

    if (from < to) {
      return time >= from && time < to;
    }

    // Handles wrapping around midnight (e.g., from 11pm to 1am)
    return time >= from || time < to;
  });

  // If no period is found, this block should theoretically never be reached with the given ONLINE setup.
  const fallbackRange = [400, 800];
  const selectedRange = period ? period.range : fallbackRange;

  const range = selectedRange[1] - selectedRange[0];

  return (
    <strong className="font-bold">
      <AutoincrementSlotCounter
        interval={[1000, 3000]}
        step={[-Math.max(Math.round(range * 0.04), 2), Math.max(Math.round(range * 0.06), 5)]}
        value={random(selectedRange[0], selectedRange[1])}
      />
    </strong>
  );
}

export default dynamic(() => Promise.resolve(HomeDetailsOnline), {
  loading: () => <Skeleton className="h-5 w-14 rounded-md" />,
  ssr: false,
});
