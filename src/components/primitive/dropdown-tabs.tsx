"use client";

import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import type { ChangeEvent, Dispatch, HTMLAttributes, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

const DropdownContext = createContext<null | [string, Dispatch<SetStateAction<string>>]>(null);

export function useDropdownTabs() {
  const context = useContext(DropdownContext);

  if (context === null) {
    throw new Error("useDropdownTabs must be used within a DropdownTabsProvider");
  }

  return context;
}

type DropdownTabsProviderProps = PropsWithChildren<{
  initial: string;
}>;

export function DropdownTabsProvider(props: DropdownTabsProviderProps) {
  const [tab, setTab] = useState(props.initial);

  return <DropdownContext.Provider value={[tab, setTab]}>{props.children}</DropdownContext.Provider>;
}

type DropdownTabsSelectOption = {
  title: string;
  value: string;
};

type DropdownTabsSelectProps = {
  options: DropdownTabsSelectOption[];
  className?: string;
};

export function DropdownTabsSelect(props: DropdownTabsSelectProps) {
  const [tab, setTab] = useDropdownTabs();

  return (
    <label className={twMerge("relative inline-flex items-center justify-center gap-1", props.className)}>
      <span>{props.options.find((item) => item.value === tab)?.title}</span>
      <CaretDownFill className="fill-blue-500" />
      <select className="absolute inset-0 appearance-none opacity-0" onChange={onChange} value={tab}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </label>
  );

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setTab(event.target.value);
  }
}

type DropdownTabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function DropdownTabsContent(props: DropdownTabsContentProps) {
  const { value, ...attrs } = props;

  const [tab] = useDropdownTabs();

  return tab === value ? <div {...attrs} /> : null;
}
