import banner from "@assets/images/customers/customerBg.png";
import lc from "@assets/images/customers/livechat.png";
import tg from "@assets/images/customers/tg.png";
import ButtonLink from "@components/shared/button-link";
import { getAdminSettings } from "@data/admin/setting";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function CustomerPage() {
  const t = await getTranslations();
  const settings = await getAdminSettings();

  const telegram = settings.find((item) => item.id === 24);
  const livechat = settings.find((item) => item.id === 25);

  return (
    <div className="space-y-2.5">
      {/* Banner Section */}
      <NextImage alt="Customer Service Banner" className="h-40 w-full rounded-lg object-cover" priority src={banner} />

      {/* Telegram Button */}
      {telegram?.link && (
        <ButtonLink className="gap-2 px-4 py-3" href={telegram.link} rel="noopener noreferrer" target="_blank">
          <NextImage alt="Telegram" height={24} src={tg} width={24} />
          {t("Telegram - Customer service")}
        </ButtonLink>
      )}

      {/* Live Chat Button */}
      {livechat?.link && (
        <ButtonLink className="gap-2 px-4 py-3" href={livechat.link} rel="noopener noreferrer" target="_blank">
          <NextImage alt="Live Chat" className="my-0.5" height={24} src={lc} width={24} />
          {t("Live Chat")}
        </ButtonLink>
      )}
    </div>
  );
}
