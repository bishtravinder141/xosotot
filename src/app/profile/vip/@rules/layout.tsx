import { getLocale } from "@lib/translation";
import type { PropsWithChildren, ReactElement } from "react";

type ProfileVipRulesSlotLayoutProps = PropsWithChildren<{
  vi: ReactElement;
}>;

export default function ProfileVipRulesSlotLayout(props: ProfileVipRulesSlotLayoutProps) {
  const locale = getLocale();

  if (locale === "vi") {
    return props.vi;
  }

  return props.children;
}
