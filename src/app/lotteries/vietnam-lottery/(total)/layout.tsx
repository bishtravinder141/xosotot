import Breadcrumbs from "@components/shared/breadcrumbs";
import UserTokenValidator from "@components/user/token-validator";
import { getTranslations } from "@lib/translation";
import type { PropsWithChildren } from "react";

export default async function VietnamLotteryLayout(props: PropsWithChildren) {
  const t = await getTranslations();

  return (
    <>
      <UserTokenValidator />
      <Breadcrumbs path={[{ label: t("Main"), href: "/" }]}>Vietnam Lottery</Breadcrumbs>

      {props.children}
    </>
  );
}
