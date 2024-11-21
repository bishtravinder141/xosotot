"use client";

import CustomerService2Fill from "@components/icon/ri/customer-service-2-fill";
import { rem } from "@lib/utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const exclude = [
  //
  "/about",
  "/customer",
];

export default function CustomerAction() {
  const pathname = usePathname();

  if (exclude.includes(pathname)) {
    return null;
  }

  return (
    <NextLink
      className="fixed bottom-24 right-4 z-appbar rounded-full border-4 border-white bg-red-200 bg-gradient-to-tr from-red-300 to-red-700 p-2 text-white"
      href="/customer"
    >
      <CustomerService2Fill size={rem(32)} />
    </NextLink>
  );
}
