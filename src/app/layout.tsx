/* eslint camelcase: "off" -- - */

import CustomerAction from "@components/customer/action";
import BottomAppbar from "@components/layout/bottom-appbar";
import VerificationNotification from "@components/layout/notification/verification";
import AutoZoom from "@components/plugin/auto-zoom";
import HistoryUpdatePlugin from "@components/plugin/history-update";
import { TimeProvider } from "@components/primitive/time";
import { LOTTERY_PERIODS } from "@config/lottery";
import dayjs from "@lib/dayjs";
import { getLocale } from "@lib/translation";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Montserrat } from "next/font/google";
import loadFont from "next/font/local";
import type { PropsWithChildren, ReactElement } from "react";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xosotot",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  viewportFit: "cover",
  userScalable: false,
};

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const burbank = loadFont({
  src: "../assets/fonts/burbank-big-condensed/black.otf",
  display: "swap",
  variable: "--burbank-big-condensed-black",
});

type RootLayoutProps = PropsWithChildren<{
  navbar: ReactElement;
}>;

export default async function RootLayout(props: RootLayoutProps) {
  const locale = getLocale();
  unstable_setRequestLocale(locale);

  const date = dayjs().tz("Asia/Ho_Chi_Minh");
  const messages = await getMessages({ locale });
  const period = LOTTERY_PERIODS.sort((a, b) => a.duration - b.duration)[0];

  return (
    <html className={twMerge(montserrat.className, burbank.variable)} lang={locale} translate="no">
      <body className="flex min-h-full flex-col bg-white text-black px-safe">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TimeProvider now={new Date(date.toDateTimeString()).valueOf()}>
            {props.navbar}

            <main className="container scroll-mt-16 space-y-5 py-3 mb-safe-offset-32 mt-safe-offset-16">
              {props.children}
            </main>

            <BottomAppbar />

            <HistoryUpdatePlugin period={period.duration} />
          </TimeProvider>

          <VerificationNotification />
        </NextIntlClientProvider>

        <Toaster position="top-center" toastOptions={{ unstyled: true }} />

        <CustomerAction />
        <AutoZoom />
      </body>
    </html>
  );
}
