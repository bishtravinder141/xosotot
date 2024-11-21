import xosotot from "@assets/images/brand/xosotot.png";
import TopAppbar from "@components/layout/top-appbar";
import NextImage from "next/image";
import NextLink from "next/link";

export default function ForgotPasswordNavbarSlot() {
  return (
    <TopAppbar>
      <NextLink className="flex h-9 items-center" href="/">
        <NextImage alt="Logo" className="h-9 w-auto object-contain" height={36} priority src={xosotot} />
      </NextLink>
    </TopAppbar>
  );
}
