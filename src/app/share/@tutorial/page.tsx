import ChevronDown from "@components/icon/custom/chevron-down";
import { Accordion, AccordionContent, AccordionTrigger } from "@components/primitive/accordion";
import { getTranslations } from "@lib/translation";

export default async function ShareTutorialSlot() {
  const t = await getTranslations();

  return (
    <>
      <h2 className="mb-4 flex items-center gap-1.5 font-bold text-blue-500">{`${t("Refer Friends and Earn")} 💸`}</h2>

      <div className="space-y-2.5">
        <Accordion aria-expanded className="group rounded-lg bg-blue-100 p-4 text-blue-500">
          <h2 className="text-sm font-bold">
            <AccordionTrigger className="flex items-center gap-3">
              {t("faq.4.question")}
              <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
            </AccordionTrigger>
          </h2>

          <AccordionContent className="">
            <p className="mt-1 text-sm text-gray-800">{t("faq.4.answer")}</p>
          </AccordionContent>
        </Accordion>
        <Accordion className="group rounded-lg bg-blue-100 p-4 text-blue-500">
          <h2 className="text-sm font-bold">
            <AccordionTrigger className="flex items-center gap-3">
              {t("faq.5.question")}
              <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
            </AccordionTrigger>
          </h2>

          <AccordionContent className="">
            <p className="mt-1 text-sm text-gray-800">{t("faq.5.answer")}</p>
          </AccordionContent>
        </Accordion>
        <Accordion className="group rounded-lg bg-blue-100 p-4 text-blue-500">
          <h2 className="text-sm font-bold">
            <AccordionTrigger className="flex items-center gap-3">
              {t("faq.6.question")}
              <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
            </AccordionTrigger>
          </h2>

          <AccordionContent className="">
            <p className="mt-1 text-sm text-gray-800">{t("faq.6.answer")}</p>
          </AccordionContent>
        </Accordion>
        <Accordion className="group rounded-lg bg-blue-100 p-4 text-blue-500">
          <h2 className="text-sm font-bold">
            <AccordionTrigger className="flex items-center gap-3">
              {t("faq.7.question")}
              <ChevronDown className="transition-transform duration-300 group-aria-expanded:-rotate-180" />
            </AccordionTrigger>
          </h2>

          <AccordionContent className="">
            <p className="mt-1 text-sm text-gray-800">{t("faq.7.answer")}</p>
          </AccordionContent>
        </Accordion>
      </div>
    </>
  );
}
