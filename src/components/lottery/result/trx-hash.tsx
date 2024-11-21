import Ball from "@components/icon/xosotot/ball";
import { getTrxHashWinners } from "@data/lottery/trx-hash";
import { UnauthorizedError } from "@lib/error";

type LotteryTrxHashResultProps = {
  type: string;
};

export default async function LotteryTrxHashResult(props: LotteryTrxHashResultProps) {
  const winners = await getTrxHashWinners(props.type, 1).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  const result = (winners?.data[0]?.block.id.slice(-5) ?? "     ").split("");

  return (
    <>
      {result.map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <Ball color={value !== " " ? "red" : void 0} key={value + index}>
          {value}
        </Ball>
      ))}
    </>
  );
}
