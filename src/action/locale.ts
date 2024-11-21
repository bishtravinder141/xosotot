"use server";

import { setLocale } from "@lib/translation";

export async function update(locale: string) {
  setLocale(locale);
}
