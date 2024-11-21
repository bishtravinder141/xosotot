"use client";

import banner3 from "@assets/images/lottery/5d-lotre/banner.jpg";
import banner4 from "@assets/images/lottery/k3-lotre/banner.jpg";
import banner2 from "@assets/images/lottery/trx-hash/banner.jpg";
import banner5 from "@assets/images/lottery/vietnam-lottery/banner.jpg";
import banner1 from "@assets/images/lottery/win-go/banner.jpg";
import { format } from "@lib/format";
import { useTranslations } from "next-intl";
import NextImage from "next/image";

const banners = {
  wingo: banner1,
  trx: banner2,
  "5d": banner3,
  k3: banner4,
  vietnam: banner5,
};

type WalletWithdrawWinnerProps = {
  id: number;
  name: string;
  game: string;
  avatar: string;
  amount: number;
};

export default function WalletWithdrawWinner(props: WalletWithdrawWinnerProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-blue-100 p-2.5">
      <NextImage alt={props.name} className="rounded-full object-cover" height={36} src={props.avatar} width={36} />

      <div className="w-12 grow space-y-1">
        <p className="text-xs font-bold text-blue-500">
          {props.name.length > 5 ? `${props.name.slice(0, 2)}*${props.name.slice(-2)}` : props.name}
        </p>
      </div>

      <NextImage alt={props.game} className="h-11 rounded" height={44} src={banners[props.game as never]} />

      <div className="grow space-y-1 overflow-hidden text-right">
        <p className="whitespace-nowrap text-xs font-bold text-green-800">
          {format(props.amount, {
            style: "currency",
            signDisplay: "always",
          })}
        </p>
        <p className="whitespace-nowrap text-[0.5rem]">{t("Winning amount")}</p>
      </div>
    </div>
  );
}
