import { getLocale } from "@lib/translation";
import type { PropsWithChildren, ReactElement } from "react";

type PrivacyPolicyLayoutProps = PropsWithChildren<{
  vi: ReactElement;
}>;

export default function TutorialLayout(props: PrivacyPolicyLayoutProps) {
  const locale = getLocale();

  if (locale === "vi") {
    return props.vi;
  }

  return props.children;
}
