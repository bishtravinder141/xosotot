import { update } from "@action/profile";
import Form from "@components/form/form";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";

export default async function EditProfileNicknamePage() {
  const t = await getTranslations();
  const session = await getSession();

  return (
    <>
      <UserTokenValidator />

      <Form action={update} className="flex flex-col gap-4 rounded-lg bg-blue-100 p-3 text-blue-500">
        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Nickname")}</span>
          <input
            className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
            defaultValue={session.user.name}
            name="name"
            placeholder={t("Write here")}
            required
            type="text"
          />
        </div>

        <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Update")}
        </SubmitButton>
      </Form>
    </>
  );
}
