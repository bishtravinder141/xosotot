import { cookies } from "next/headers";
import "server-only";

const COOKIE_NAME = "payment:crypto";

export function getSelectedCryptoWallet() {
  const cookie = cookies().get(COOKIE_NAME);

  return cookie ? cookie.value : null;
}

export function setSelectedCryptoWallet(wallet?: string | null) {
  if (wallet) {
    cookies().set(COOKIE_NAME, wallet, {
      maxAge: 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
  } else {
    cookies().delete(COOKIE_NAME);
  }
}
