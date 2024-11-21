import Clock from "@components/icon/custom/clock";
import Copy from "@components/icon/custom/copy";
import Document from "@components/icon/custom/document";
import PeopleTeam20Filled from "@components/icon/fluent/people-team-20-filled";
import { TabsTrigger } from "@components/primitive/tabs";
import { getTranslations } from "@lib/translation";

export default async function SharePage() {
  const t = await getTranslations();

  return (
    <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5">
      <TabsTrigger
        className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
        value="data"
      >
        <Document />
        {t("Data")}
      </TabsTrigger>
      <TabsTrigger
        className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
        value="team"
      >
        <PeopleTeam20Filled />
        {t("Team")}
      </TabsTrigger>
      <TabsTrigger
        className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
        value="history"
      >
        <Clock />
        {t("History")}
      </TabsTrigger>
      <TabsTrigger
        className="flex flex-1 items-center justify-center gap-1.5 rounded bg-red-50 p-2.5 text-xs data-[state=selected]:bg-red-300 data-[state=selected]:text-white"
        value="tutorial"
      >
        <Copy />
        {t("Tutorial")}
      </TabsTrigger>
    </div>
  );
}
