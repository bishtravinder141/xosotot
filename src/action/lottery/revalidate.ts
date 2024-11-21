"use server";

import { getSession } from "@lib/session";
import { revalidateTag } from "next/cache";

export async function revalidate() {
  const session = await getSession().catch(() => null);

  if (session) {
    revalidateTag(`history#${session.user.id}`);
    revalidateTag(`wallet#${session.user.id}`);
    revalidateTag(`report#${session.user.id}`);
  }

  revalidateTag("winners");
}
