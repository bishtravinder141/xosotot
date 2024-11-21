import WalletWithdrawWinnersCounter from "@components/wallet/withdraw/counter";
import { getLatestWithdrawalWinners } from "@data/withdrawals";

export default async function WalletWithdrawWinners() {
  const winners = await getLatestWithdrawalWinners();

  return <WalletWithdrawWinnersCounter winners={[...winners, ...winners]} />;
}
