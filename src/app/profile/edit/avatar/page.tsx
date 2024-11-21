import { update } from "@action/profile";
import Form from "@components/form/form";
import ProfileAvatarInput from "@components/profile/avatar-input";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";

export default async function EditProfileAvatarPage() {
  const t = await getTranslations();
  const session = await getSession();

  return (
    <>
      <UserTokenValidator />

      <Form action={update} className="flex flex-col gap-5 rounded-lg bg-blue-100 px-3 py-5 text-blue-500">
        <ProfileAvatarInput avatar={session.user.avatar} gender={session.user.gender} />

        <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Update")}
        </SubmitButton>
      </Form>
    </>
  );
}
