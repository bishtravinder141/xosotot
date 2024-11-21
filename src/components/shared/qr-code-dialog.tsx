"use client";

import NotificationDialog from "@components/dialog/notification";
import Copy from "@components/icon/custom/copy";
import ClipboardTrigger from "@components/primitive/clipboard-trigger";
import { rem } from "@lib/utils";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { useState } from "react";

type QRCodeDialogProps = {
  qrcode: string;
  invitation_code: string;
};

export default function QRCodeDialog(props: QRCodeDialogProps) {
  const t = useTranslations();

  const data = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration?ref=${props.invitation_code}`,
  };

  const [show, setShow] = useState(false);

  const share = () => {
    void navigator.share(data).catch(() => 0);
  };

  return (
    <>
      <button
        className="flex w-0 grow justify-center rounded-md bg-black"
        onClick={setShow.bind(0, true)}
        type="button"
      >
        <NextImage alt="QR Code" className="m-1 size-14" height={56} src={props.qrcode} width={56} />
      </button>

      <NotificationDialog closable onClose={setShow.bind(0, false)} show={show} title={t("Share")}>
        <div className="py-3">
          <NextImage alt="QR Code" className="mx-auto size-44" height={56} src={props.qrcode} width={56} />
        </div>

        <div className="space-y-3 overflow-y-auto rounded-lg bg-blue-100 p-2.5 text-xs">
          <p className="px-1">{t("share.description")}</p>

          <div className="space-y-1 rounded-lg bg-white p-2">
            <strong className="font-bold">{t("Referral code")}</strong>

            <ClipboardTrigger className="flex w-full gap-1.5" value={props.invitation_code}>
              <span className="flex-1 truncate text-left tracking-wider">{props.invitation_code}</span>
              <Copy className="my-0.5 text-blue-500" size={rem(12)} />
            </ClipboardTrigger>
          </div>
        </div>

        {typeof navigator === "object" && typeof navigator.canShare === "function" && navigator.canShare(data) && (
          <div className="px-2.5">
            <button
              className="flex w-full justify-center rounded-lg from-green-800 from-15% to-green-600 to-80% p-3 font-bold text-white bg-gradient-[177]"
              onClick={share}
              type="button"
            >
              {t("Save and Share")}
            </button>
          </div>
        )}
      </NotificationDialog>
    </>
  );
}
