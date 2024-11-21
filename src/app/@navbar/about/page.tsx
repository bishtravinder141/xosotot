import TopAppbar from "@components/layout/top-appbar";
import TopAppbarBack from "@components/layout/top-appbar/back";
import TopAppBarTitle from "@components/layout/top-appbar/title";
import { getTranslations } from "@lib/translation";

export default async function AboutNavbarSlot() {
  const t = await getTranslations();

  return (
    <TopAppbar>
      <TopAppbarBack href="/" />

      <TopAppBarTitle>{t("About")}</TopAppBarTitle>
    </TopAppbar>
  );
}
