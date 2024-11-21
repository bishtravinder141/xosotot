import xosotot from "@assets/images/brand/xosotot.png";
import TopAppbar from "@components/layout/top-appbar";
import { getSession } from "@lib/session";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function LotteryAppbar() {
  const session = await getSession().catch(() => null);

  return (
    <TopAppbar anonymous={session === null}>
      <NextLink className="flex h-9 items-center" href="/">
        <NextImage alt="Logo" className="h-9 w-auto object-contain" height={36} priority src={xosotot} />
      </NextLink>
    </TopAppbar>
  );
}
