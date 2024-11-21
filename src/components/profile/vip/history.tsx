import notebook from "@assets/images/general/notebook.png";
import VipHistoryCard from "@components/profile/vip/history/card";
import Pagination from "@components/shared/pagination";
import { getExperienceHistory } from "@data/membership";
import { UnauthorizedError } from "@lib/error";
import { getTranslations } from "@lib/translation";
import NextImage from "next/image";

type VipHistoryProps = {
  page: number;
};

export default async function VipHistory(props: VipHistoryProps) {
  const t = await getTranslations();
  const history = await getExperienceHistory(props.page).catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  if (history === null || history.meta.pagination.total < 1) {
    return (
      <div className="flex flex-col items-center gap-3 py-3">
        <NextImage alt="Notebook" className="max-w-24" src={notebook} />
        <p className="text-[0.625rem]">{t("No data available")}</p>
      </div>
    );
  }

  return (
    <>
      {history.data.map((item) => (
        <VipHistoryCard experience={item.exp} key={item.id} updated_at={item.updated_at} />
      ))}

      {history.meta.pagination.total > history.meta.pagination.limit && (
        <Pagination {...history.meta.pagination} className="mt-5 flex justify-center pb-1" sibling={0} />
      )}
    </>
  );
}
