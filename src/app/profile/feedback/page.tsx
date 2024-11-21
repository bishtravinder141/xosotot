import { feedback } from "@action/profile";
import feedbackImg from "@assets/images/feedback/feedbackImg.png";
import Form from "@components/form/form";
import SubmitButton from "@components/shared/submit-button";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

export default async function Feedback() {
  const t = await getTranslations();

  return (
    <Form
      action={feedback}
      className="flex h-[75vh] flex-col justify-between gap-4 rounded-lg bg-blue-100 p-3 text-blue-500"
    >
      <div className="space-y-2.5">
        <span className="text-xs font-bold">{t("Feedback")}</span>

        <div className="flex h-[200px] rounded-lg bg-white px-3 py-1">
          <textarea
            className="flex-1 bg-transparent py-2 text-xs text-black"
            name="feedback"
            placeholder={t("Feedback Placeholder")}
            required
          />
        </div>
      </div>
      <div>
        <h4 className="text-center text-xs text-[#1e2637]">{t("Send helpful feedbacks")}</h4>
        <h5 className="text-center text-xs text-[#1e2637]">{t("Chance to win Mystery Rewards")}</h5>
        <NextImage
          alt="Feedback"
          className="feedback-img mx-auto mb-3 max-w-[210px] rounded-lg"
          priority
          src={feedbackImg}
        />
        <SubmitButton className="w-full rounded-full bg-blue-500 px-2.5 py-3 text-xs font-bold text-white">
          {t("Submit")}
        </SubmitButton>
      </div>
    </Form>
  );
}
