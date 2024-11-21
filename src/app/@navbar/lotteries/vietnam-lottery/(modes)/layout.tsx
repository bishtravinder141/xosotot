import TopAppbar from "@components/layout/top-appbar";
import TopAppbarBack from "@components/layout/top-appbar/back";
import TopAppBarTitle from "@components/layout/top-appbar/title";
import type { PropsWithChildren } from "react";

export default function VietnamLotteryModeNavbarSlotLayout(props: PropsWithChildren) {
  return (
    <TopAppbar sound>
      <TopAppbarBack href="/lotteries/vietnam-lottery" />

      <TopAppBarTitle>{props.children}</TopAppBarTitle>
    </TopAppbar>
  );
}
