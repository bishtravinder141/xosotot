import VietnamLotteryPreviousResultDialog from "@components/lottery/vietnam-lottery/previous-result-dialog";
import { getVietnamLotteryWinners } from "@data/lottery/vietnam-lottery";
import { UnauthorizedError } from "@lib/error";

type VietnamLotteryPreviousResultProps = {
  area: number;
  city: string;
  title: string;
};

export default async function VietnamLotteryPreviousResult(props: VietnamLotteryPreviousResultProps) {
  const winners = await getVietnamLotteryWinners(props.area, props.city, 1).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (winners === null || winners.data.length < 1) {
    return null;
  }

  return (
    <VietnamLotteryPreviousResultDialog
      created_at={winners.data[0].created_at}
      ranks={winners.data[0].ranks}
      title={props.title}
    />
  );
}
