import CashLine from "@components/icon/ri/cash-line";
import { getWallet } from "@data/wallet";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { rem } from "@lib/utils";

export default async function WalletTodayWithdrawal() {
  const wallet = await getWallet().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <CashLine size={rem(12)} />
      <span className="truncate text-[0.625rem] leading-3 text-black">
        {format(wallet?.withdrawal.today ?? 0, {
          style: "currency",
        })}
      </span>
    </>
  );
}
