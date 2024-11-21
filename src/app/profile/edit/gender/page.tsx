import { update } from "@action/profile";
import Form from "@components/form/form";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import SubmitButton from "@components/shared/submit-button";
import UserTokenValidator from "@components/user/token-validator";
import { GENDERS } from "@config/profile";
import { getSession } from "@lib/session";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";

export default async function EditProfileGenderPage() {
  const t = await getTranslations();
  const session = await getSession();

  return (
    <>
      <UserTokenValidator />

      <Form action={update} className="flex flex-col gap-5 rounded-lg bg-blue-100 px-3 py-5 text-blue-500">
        <div className="space-y-2.5">
          <span className="text-xs font-bold">{t("Gender")}</span>
          <label className="relative flex w-full rounded-lg bg-white px-2 py-1.5 text-xs text-black">
            <select
              className="w-full appearance-none bg-transparent py-1 pr-3"
              defaultValue={session.user.gender}
              name="gender"
              required
            >
              {GENDERS.map((item) => (
                <option key={item.code} value={item.code}>
                  {t(item.name)}
                </option>
              ))}
            </select>
            <CaretDownFill className="pointer-events-none absolute right-2 top-3" size={rem(12)} />
          </label>
        </div>

        <SubmitButton className="w-full rounded-lg bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Update")}
        </SubmitButton>
      </Form>
    </>
  );
}
