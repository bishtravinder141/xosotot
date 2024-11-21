import TopAppbar from "@components/layout/top-appbar";
import TopAppbarBack from "@components/layout/top-appbar/back";
import TopAppBarTitle from "@components/layout/top-appbar/title";
import { getTranslations } from "@lib/translation";

export default async function TermOfUseNavbarSlot() {
  const t = await getTranslations();

  return (
    <TopAppbar>
      <TopAppbarBack href="/about" />

      <TopAppBarTitle>{t("Term of Use")}</TopAppBarTitle>
    </TopAppbar>
  );
}
