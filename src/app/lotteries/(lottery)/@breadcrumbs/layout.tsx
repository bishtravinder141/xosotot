import Breadcrumbs from "@components/shared/breadcrumbs";
import { getTranslations } from "@lib/translation";
import type { PropsWithChildren } from "react";

export default async function LotteryBreadcrumbsSlotLayout(props: PropsWithChildren) {
  const t = await getTranslations();

  return <Breadcrumbs path={[{ label: t("Main"), href: "/" }]}>{props.children}</Breadcrumbs>;
}
