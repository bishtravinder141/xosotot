import { cookies } from "next/headers";
import "server-only";

const COOKIE_NAME = "payment:card";

export function getSelectedBank() {
  const cookie = cookies().get(COOKIE_NAME);

  return cookie ? cookie.value : null;
}

export function setSelectedBank(bank?: string | null) {
  if (bank) {
    cookies().set(COOKIE_NAME, bank, {
      maxAge: 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
  } else {
    cookies().delete(COOKIE_NAME);
  }
}
