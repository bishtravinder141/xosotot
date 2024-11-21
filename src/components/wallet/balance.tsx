import CashLine from "@components/icon/ri/cash-line";
import { getWallet } from "@data/wallet";
import { UnauthorizedError } from "@lib/error";
import { format } from "@lib/format";
import { rem } from "@lib/utils";

export default async function WalletBalance() {
  const wallet = await getWallet().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <CashLine size={rem(16)} />
      <span className="text-sm text-black">
        {format(wallet?.balance ?? 0, {
          style: "currency",
        })}
      </span>
    </>
  );
}
