import ButtonLink from "@components/shared/button-link";
import { getTranslations } from "@lib/translation";

export default async function AboutPage() {
  const t = await getTranslations();

  return (
    <>
      <ButtonLink href="/about/privacy-policy">{t("Privacy Policy")}</ButtonLink>
      <ButtonLink href="/about/term-of-use">{t("Term of Use")}</ButtonLink>
      <ButtonLink href="/about/risk-disclosure-agreement">{t("Risk Disclosure Agreement")}</ButtonLink>
    </>
  );
}
