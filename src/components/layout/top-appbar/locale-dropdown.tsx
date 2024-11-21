"use client";

import { update } from "@action/locale";
import CaretDownFill from "@components/icon/bootstrap/caret-down-fill";
import { AVAILABLE_LANGUAGES } from "@config/translation";
import { rem } from "@lib/utils";
import { useLocale } from "next-intl";
import type { ChangeEvent } from "react";

export default function LocaleDropdown() {
  const locale = useLocale();

  return (
    <label className="relative inline-flex items-center justify-center gap-1 rounded-full bg-red-200 text-sm capitalize tracking-wide">
      <span>{locale}</span>
      <CaretDownFill size={rem(10)} />
      <select className="absolute inset-0 appearance-none opacity-0" onChange={onChange} value={locale}>
        {AVAILABLE_LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </label>
  );

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    void update(event.target.value);
  }
}
