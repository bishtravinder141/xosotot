import ArrowDown from "@components/icon/custom/arrow-down";
import { getWallet } from "@data/wallet";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { rem } from "@lib/utils";

export default async function WalletTotalWithdrawal() {
  const wallet = await getWallet().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <ArrowDown size={rem(12)} />
      <span className="truncate text-[0.625rem] leading-3 text-black">
        {format(wallet?.withdrawal.latest ?? 0, {
          style: "currency",
        })}
      </span>
    </>
  );
}
