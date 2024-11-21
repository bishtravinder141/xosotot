import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from "@config/translation";
import { getTranslations as getNextIntlTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import "server-only";

export function userLanguages(params: { headers: Headers }) {
  const header = params.headers.get("accept-language");

  if (!header) {
    return [];
  }

  const languages = header.split(",");

  return languages.map((language) => {
    const [code] = language.split(";");

    return code;
  });
}

export function getLocale() {
  const locale = cookies().get("locale")?.value;

  if (AVAILABLE_LANGUAGES.some((language) => language.code === locale)) {
    return locale!;
  }

  return DEFAULT_LANGUAGE.code;
}

export function setLocale(code: string) {
  if (AVAILABLE_LANGUAGES.some((language) => language.code === code)) {
    cookies().set("locale", code, {
      maxAge: 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
  }
}

export function getTranslations(namespace?: string) {
  const locale = getLocale();

  return getNextIntlTranslations({ locale, namespace });
}
