import { getLocale } from "@lib/translation";
import type { PropsWithChildren, ReactElement } from "react";

type RiskDisclosureAgreementLayoutProps = PropsWithChildren<{
  vi: ReactElement;
}>;

export default function RiskDisclosureAgreementLayout(props: RiskDisclosureAgreementLayoutProps) {
  const locale = getLocale();

  if (locale === "vi") {
    return props.vi;
  }

  return props.children;
}
