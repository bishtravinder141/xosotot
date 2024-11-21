import TopAppbar from "@components/layout/top-appbar";
import TopAppbarBack from "@components/layout/top-appbar/back";
import TopAppBarTitle from "@components/layout/top-appbar/title";
import { getTranslations } from "@lib/translation";

export default async function ProfileEditAvatarNavbarSlot() {
  const t = await getTranslations();

  return (
    <TopAppbar>
      <TopAppbarBack href="/profile/edit" />

      <TopAppBarTitle>{`${t("Edit")} ${t("Profile Photo")}`}</TopAppBarTitle>
    </TopAppbar>
  );
}