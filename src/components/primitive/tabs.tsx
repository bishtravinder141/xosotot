"use client";

import type { Dispatch, HTMLAttributes, MouseEvent, PropsWithChildren, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

const TabsContext = createContext<null | [null | string, Dispatch<SetStateAction<null | string>>, null | string]>(null);

export function useTabs() {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error("useTabs must be used within a TabsProvider");
  }

  return context;
}

type TabsProviderProps = PropsWithChildren<{
  initial?: string;
  onChange?: Dispatch<string | null>;
}>;

export function TabsProvider(props: TabsProviderProps) {
  const initial = props.initial ?? null;
  const [tab, setTab] = useState(initial);

  return <TabsContext.Provider value={[tab, onChange, initial]}>{props.children}</TabsContext.Provider>;

  function onChange(state: SetStateAction<string | null>) {
    const action = typeof state === "function" ? state : () => state;
    const newTab = action(tab);

    setTab(newTab);
    props.onChange?.(newTab);
  }
}

type TabsTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
  className?: string;
};

export function TabsTrigger(props: TabsTriggerProps) {
  const [tab, setTab, initial] = useTabs();

  return <button type="button" {...props} data-state={tab === props.value ? "selected" : void 0} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    setTab((state) => (state === props.value && initial === null ? initial : props.value));
    props.onClick?.(event);
  }
}

type TabsContentProps = {
  value: string;
  children: ReactNode;
};

export function TabsContent(props: TabsContentProps) {
  const [tab] = useTabs();

  return tab === props.value ? props.children : null;
}
