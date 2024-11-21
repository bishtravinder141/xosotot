import Ball from "@components/icon/xosotot/ball";
import { get5DLotreWinners } from "@data/lottery/5d-lotre";
import { UnauthorizedError } from "@lib/error";
import { rem } from "@lib/utils";

type Lottery5DLotreResultProps = {
  type: string;
};

export default async function Lottery5DLotreResult(props: Lottery5DLotreResultProps) {
  const winners = await get5DLotreWinners(props.type, 1).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  const result = winners?.data[0]?.result ?? "     ";
  const sum = winners?.data[0]?.sum ?? 0;

  return (
    <>
      {"ABCDE".split("").map((group, index) => (
        // eslint-disable-next-line react/no-array-index-key -- -
        <div className="flex flex-col items-center" key={result + index}>
          <Ball color={result[index] !== " " ? "black" : void 0} size={rem(40)}>
            {result[index]}
          </Ball>
          <span className="text-[0.625rem] font-bold leading-4">{group}</span>
        </div>
      ))}
      <span className="mb-4 self-center text-sm font-bold">=</span>
      <Ball className="mb-4" color="yellow" size={rem(40)}>
        {sum}
      </Ball>
    </>
  );
}
