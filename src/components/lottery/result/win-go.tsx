import Ball from "@components/icon/xosotot/ball";
import { LOTTERY_NUMBERS } from "@config/lottery";
import { getWinGoWinners } from "@data/lottery/win-go";
import { UnauthorizedError } from "@lib/error";

type LotteryWinGoResultProps = {
  type: string;
};

export default async function LotteryWinGoResult(props: LotteryWinGoResultProps) {
  const winners = await getWinGoWinners(props.type, 1).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  const latest = LOTTERY_NUMBERS.find((item) => item.value === winners?.data[0].result);

  return latest ? <Ball color={latest.color as never}>{latest.value}</Ball> : <Ball />;
}
