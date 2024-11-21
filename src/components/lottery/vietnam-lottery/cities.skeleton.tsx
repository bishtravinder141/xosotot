import VietnamLotteryTicketSkeleton from "@components/lottery/vietnam-lottery/ticket.skeleton";

export default function VietnamLotteryCitiesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {Array.from(Array(4)).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <div className="flex flex-col gap-3" key={index}>
          <VietnamLotteryTicketSkeleton />
        </div>
      ))}
    </div>
  );
}
