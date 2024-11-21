"use client";

import type { AriaAttributes, Dispatch, HTMLAttributes, MouseEvent, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

const AccordionContext = createContext([
  false as boolean,
  (() => void 0) as Dispatch<SetStateAction<boolean>>,
] as const);

export function Accordion(props: HTMLAttributes<HTMLDivElement> & AriaAttributes) {
  const [isExpanded, setIsExpanded] = useState(() => {
    const expanded = props["aria-expanded"];

    if (typeof expanded === "boolean") {
      return expanded;
    }

    return expanded ? expanded === "true" : false;
  });

  return (
    <AccordionContext.Provider value={[isExpanded, setIsExpanded]}>
      <div {...props} aria-expanded={isExpanded}>
        {props.children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionTrigger(props: HTMLAttributes<HTMLButtonElement>) {
  const [_isExpanded, setIsExpanded] = useContext(AccordionContext);

  return <button type="button" {...props} onClick={onClick} />;

  function onClick(event: MouseEvent<HTMLButtonElement>) {
    setIsExpanded((state) => !state);
    props.onClick?.(event);
  }
}

export function AccordionContent(props: HTMLAttributes<HTMLDivElement>) {
  const [isExpanded] = useContext(AccordionContext);

  return (
    <div
      aria-expanded={isExpanded}
      className={twMerge(
        "box-content grid transition-[grid-template-rows] duration-500",
        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div {...props} className={twMerge("overflow-hidden", props.className)} />
    </div>
  );
}
