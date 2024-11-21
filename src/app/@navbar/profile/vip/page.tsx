import TopAppbar from "@components/layout/top-appbar";
import TopAppbarBack from "@components/layout/top-appbar/back";
import TopAppBarTitle from "@components/layout/top-appbar/title";

export default async function DefaultNavbarSlot() {
  return (
    <TopAppbar>
      <TopAppbarBack href="/profile" />

      <TopAppBarTitle>VIP</TopAppBarTitle>
    </TopAppbar>
  );
}
