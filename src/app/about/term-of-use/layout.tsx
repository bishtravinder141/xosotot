import { getLocale } from "@lib/translation";
import type { PropsWithChildren, ReactElement } from "react";

type TermOfUseLayoutProps = PropsWithChildren<{
  vi: ReactElement;
}>;

export default function TermOfUseLayout(props: TermOfUseLayoutProps) {
  const locale = getLocale();

  if (locale === "vi") {
    return props.vi;
  }

  return props.children;
}
