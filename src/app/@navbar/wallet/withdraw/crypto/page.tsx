import TopAppbar from "@components/layout/top-appbar";
import TopAppbarBack from "@components/layout/top-appbar/back";
import TopAppBarTitle from "@components/layout/top-appbar/title";

export default async function WalletWithdrawalCryptoNavbarSlot() {
  return (
    <TopAppbar>
      <TopAppbarBack href="/wallet/withdraw" />

      <TopAppBarTitle>USDT</TopAppBarTitle>
    </TopAppbar>
  );
}
