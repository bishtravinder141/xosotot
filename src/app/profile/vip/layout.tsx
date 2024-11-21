import History from "@components/icon/fa-solid/history";
import CupBold from "@components/icon/solar/cup-bold";
import { TabsContent, TabsProvider, TabsTrigger } from "@components/primitive/tabs";
import UserTokenValidator from "@components/user/token-validator";
import { getTranslations } from "@lib/translation";
import { rem } from "@lib/utils";
import type { PropsWithChildren, ReactElement } from "react";

type ProfileVipLayoutProps = PropsWithChildren<{
  rules: ReactElement;
  history: ReactElement;
}>;

export default async function ProfileVipLayout(props: ProfileVipLayoutProps) {
  const t = await getTranslations();

  return (
    <>
      <UserTokenValidator />

      {props.children}

      <TabsProvider initial="history">
        <div className="flex gap-2.5 whitespace-nowrap text-xs font-bold text-blue-500">
          <TabsTrigger
            className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
            value="history"
          >
            <History size={rem(16)} />
            {t("History")}
          </TabsTrigger>
          <TabsTrigger
            className="inline-flex w-0 grow flex-col gap-2 rounded-lg bg-blue-100 px-2 py-3 transition-colors data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
            value="rules"
          >
            <CupBold size={rem(16)} />
            {t("Rules")}
          </TabsTrigger>
        </div>

        <div className="-mx-5 space-y-5 overflow-x-auto px-5">
          <TabsContent value="history">{props.history}</TabsContent>

          <TabsContent value="rules">{props.rules}</TabsContent>
        </div>
      </TabsProvider>
    </>
  );
}
