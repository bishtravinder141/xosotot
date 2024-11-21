import banner from "@assets/images/registration/banner.png";
import AuthForm from "@components/auth/form";
import ChevronLeft from "@components/icon/custom/chevron-left";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import { cookies } from "next/headers";
import NextImage from "next/image";
import NextLink from "next/link";

export default async function RegistrationPage() {
  const t = await getTranslations();

  const ref = cookies().get("ref")?.value;

  return (
    <>
      <header className="mt-2 flex items-center justify-between gap-3">
        <NextLink className="size-9 rounded-full bg-red-200 p-3.5 text-white" href="/login">
          <ChevronLeft size={rem(8)} />
        </NextLink>

        <h1 className="font-bold">{t("Registration")}</h1>

        <div className="w-9" />
      </header>

      <div className="space-y-2.5">
        <NextImage alt="Banner" className="rounded-lg" priority src={banner} />

        <p className="w-8/12 text-sm">{t("Enter your details to enter your personal account")}</p>
      </div>

      <AuthForm code={ref} />
    </>
  );
}
