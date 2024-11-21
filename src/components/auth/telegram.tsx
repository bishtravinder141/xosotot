"use client";

import type { AllHTMLAttributes } from "react";
import { useEffect, useRef } from "react";

export default function TelegramAuth(props: AllHTMLAttributes<HTMLDivElement>) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://telegram.org/js/telegram-widget.js";
    scriptElement.setAttribute("data-telegram-login", "xosototBot");
    scriptElement.setAttribute("data-size", "large");
    scriptElement.setAttribute("data-auth-url", "https://api.xosotot.com/api/auth/telegram/callback");
    scriptElement.setAttribute("data-request-access", "write");
    scriptElement.async = true;

    wrap.current!.appendChild(scriptElement);
  }, []);

  return <div {...props} ref={wrap} />;
}
