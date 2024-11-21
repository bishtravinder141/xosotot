import { getDetails } from "@data/details";
import { getTranslations } from "@lib/translation";

export default async function HomeDetailsDays() {
  const t = await getTranslations();
  const details = await getDetails();

  return <strong className="text-3xl font-bold">{`${details.days} ${t("days")}`}</strong>;
}
