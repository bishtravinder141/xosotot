import coins from "@assets/images/home/coins.webp";
import gamepad from "@assets/images/home/gamepad.webp";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <section className="relative space-y-5">
      <h1 className="w-8/12 text-2xl font-bold text-blue-500">{t("welcome.title")}</h1>

      <p>{t("welcome.summary")}</p>

      <NextImage alt="Coint" className="absolute -right-1 top-3" height={60} src={coins} />
      <NextImage alt="Gamepad" className="absolute -top-9 right-8" height={110} src={gamepad} />
    </section>
  );
}
