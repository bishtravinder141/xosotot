import roulette from "@assets/images/home/roulette.png";
import lottery5DLotre from "@assets/images/lottery/5d-lotre/banner1.webp";
import lotteryK3Lotre from "@assets/images/lottery/k3-lotre/banner1.webp";
import lotteryTRXHash from "@assets/images/lottery/trx-hash/banner1.webp";
import lotteryVietnamLottery from "@assets/images/lottery/vietnam-lottery/banner.webp";
import lotteryWinGo from "@assets/images/lottery/win-go/banner.webp";
import LotteryLink from "@components/lottery/link";
import { getLotteryWinners } from "@data/lottery";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function HomeLotteriesSlot() {
  const t = await getTranslations();

  const winners = await Promise.all([
    getLotteryWinners(0),
    getLotteryWinners(1),
    getLotteryWinners(2),
    getLotteryWinners(3),
    getLotteryWinners(0),
  ]);

  return (
    <section className="relative space-y-5">
      <h2 className="flex items-center gap-2.5 font-bold text-blue-500">
        {t("Lottery")}
        <NextImage alt="Other games" className="size-5 shrink-0" height={20} src={roulette} width={20} />
      </h2>

      <div className="space-y-2.5">
        <LotteryLink
          image={lotteryVietnamLottery}
          label="Vietnam Lottery"
          slug="vietnam-lottery"
          winners={winners[4]}
        />
        <LotteryLink image={lotteryWinGo} label="Win Go" slug="win-go" winners={winners[0]} />
        <LotteryLink image={lotteryTRXHash} label="TRX Hash" slug="trx-hash" winners={winners[1]} />
        <LotteryLink image={lottery5DLotre} label="5D Lotre" slug="5d-lotre" winners={winners[2]} />
        <LotteryLink image={lotteryK3Lotre} label="K3 Lotre" slug="k3-lotre" winners={winners[3]} />
      </div>
    </section>
  );
}
