import Plus from "@components/icon/custom/plus";
import UserTokenValidator from "@components/user/token-validator";
import CryptoWalletCard from "@components/wallet/payment/crypto-wallet-card";
import { getUserCryptoWallets } from "@data/payment";
import { UnauthorizedError } from "@lib/error";
import { getSelectedCryptoWallet } from "@lib/payment/crypto";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import NextLink from "next/link";

export default async function WithdrawBanksPage() {
  const t = await getTranslations();

  const session = await getSession();
  const selected = getSelectedCryptoWallet();
  const wallets = await getUserCryptoWallets().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return (
    <>
      <UserTokenValidator />

      {wallets?.map((wallet) => (
        <CryptoWalletCard
          account={wallet.wallet_id}
          holder={session.user.real_name!}
          id={wallet.id}
          key={wallet.id}
          network={wallet.network}
          selected={selected === wallet.id.toString()}
        />
      ))}

      <NextLink
        className="flex items-center justify-center gap-2.5 rounded-lg bg-red-50 px-2 py-2.5 text-xs text-black"
        href="/wallet/withdraw/crypto/add"
      >
        <Plus className="my-1 text-blue-500" size={rem(12)} />
        {t("Add USDT")}
      </NextLink>
    </>
  );
}
