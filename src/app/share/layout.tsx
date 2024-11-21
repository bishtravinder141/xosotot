import { TabsContent, TabsProvider } from "@components/primitive/tabs";
import UserTokenValidator from "@components/user/token-validator";
import type { PropsWithChildren, ReactElement } from "react";

type ShareLayoutProps = PropsWithChildren<{
  data: ReactElement;
  history: ReactElement;
  team: ReactElement;
  tutorial: ReactElement;
}>;

export default function ShareLayout(props: ShareLayoutProps) {
  return (
    <>
      <UserTokenValidator />

      <TabsProvider initial="data">
        {props.children}

        <TabsContent value="data">{props.data}</TabsContent>
        <TabsContent value="team">{props.team}</TabsContent>
        <TabsContent value="history">{props.history}</TabsContent>
        <TabsContent value="tutorial">{props.tutorial}</TabsContent>
      </TabsProvider>
    </>
  );
}
