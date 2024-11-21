import betting from "@assets/images/home/betting.webp";
import info from "@assets/images/home/info.png";
import online from "@assets/images/home/online.webp";
import player from "@assets/images/home/player.webp";
import HomeDetailsBetting from "@components/home/details/betting";
import HomeDetailsOnline from "@components/home/details/online";
import HomeDetailsUsers from "@components/home/details/users";
import ChevronDown from "@components/icon/custom/chevron-down";
import { Accordion, AccordionContent, AccordionTrigger } from "@components/primitive/accordion";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";
import type { PropsWithChildren, ReactElement } from "react";

type HomeLayoutProps = PropsWithChildren<{
  announcement: ReactElement;
  banners: ReactElement;
  games: ReactElement;
  lotteries: ReactElement;
  notification: ReactElement;
  winners: ReactElement;
  withdraws: ReactElement;
}>;

export default async function HomeLayout(props: HomeLayoutProps) {
  const t = await getTranslations();

  return (
    <>
      {props.notification}
      {props.banners}

      {props.children}
      {props.lotteries}
      {props.games}

      <div className="space-y-5">
        <div className="flex justify-between gap-3 rounded-lg bg-blue-100 px-5 py-3 text-sm text-blue-500">
          <div className="flex flex-col gap-1">
            <HomeDetailsUsers />
            <span>{t("Player")}</span>
          </div>

          <div className="-my-3 mr-4 flex">
            <NextImage alt="Player" className="w-auto object-cover" height={64} src={player} />
          </div>
        </div>

        <div className="flex justify-between gap-3 rounded-lg bg-blue-100 px-5 py-3 text-sm text-blue-500">
          <div className="flex flex-col gap-1">
            <HomeDetailsBetting />
            <span>{t("Total of betting")}</span>
          </div>

          <div className="-my-3 mr-3 flex">
            <NextImage alt="Betting" className="w-auto object-cover" height={64} src={betting} />
          </div>
        </div>

        <div className="flex justify-between gap-3 rounded-lg bg-blue-100 px-5 py-3 text-sm text-blue-500">
          <div className="flex flex-col gap-1">
            <HomeDetailsOnline />
            <span>{t("Users online")}</span>
          </div>

          <div className="-my-3 flex">
            <NextImage alt="Online" className="w-auto object-cover" height={64} src={online} />
          </div>
        </div>
      </div>

      {props.winners}
      {props.withdraws}

      <section className="relative space-y-5">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-500">
          {t("How it work?")}
          <NextImage alt="Info" className="size-7 shrink-0" height={28} src={info} width={28} />
        </h2>

        <div className="space-y-2.5">
          <Accordion aria-expanded className="group rounded-lg bg-blue-100 p-4 text-blue-500">
            <h2 className="text-sm font-bold">
              <AccordionTrigger className="flex items-center gap-3">
                {t("faq.0.question")}
                <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
              </AccordionTrigger>
            </h2>

            <AccordionContent className="">
              <p className="mt-1 text-sm text-gray-800">{t("faq.0.answer")}</p>
            </AccordionContent>
          </Accordion>
          <Accordion className="group rounded-lg bg-blue-100 p-4 text-blue-500">
            <h2 className="text-sm font-bold">
              <AccordionTrigger className="flex items-center gap-3">
                {t("faq.1.question")}
                <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
              </AccordionTrigger>
            </h2>

            <AccordionContent className="">
              <p className="mt-1 text-sm text-gray-800">{t("faq.1.answer")}</p>
            </AccordionContent>
          </Accordion>
          <Accordion className="group rounded-lg bg-blue-100 p-4 text-blue-500">
            <h2 className="text-sm font-bold">
              <AccordionTrigger className="flex items-center gap-3">
                {t("faq.2.question")}
                <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
              </AccordionTrigger>
            </h2>

            <AccordionContent className="">
              <p className="mt-1 text-sm text-gray-800">{t("faq.2.answer")}</p>
            </AccordionContent>
          </Accordion>
          <Accordion className="group rounded-lg bg-blue-100 p-4 text-blue-500">
            <h2 className="text-sm font-bold">
              <AccordionTrigger className="flex items-center gap-3">
                {t("faq.3.question")}
                <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
              </AccordionTrigger>
            </h2>

            <AccordionContent className="">
              <p className="mt-1 text-sm text-gray-800">{t("faq.3.answer")}</p>
            </AccordionContent>
          </Accordion>
        </div>
      </section>

      {props.announcement}
    </>
  );
}
