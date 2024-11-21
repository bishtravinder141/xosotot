"use client";

import { useEffect, useState } from "react";

export default function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onChange = () => {
      setVisible(!document.hidden);
    };

    setVisible(!document.hidden);

    document.addEventListener("visibilitychange", onChange);

    return function cancel() {
      document.removeEventListener("visibilitychange", onChange);
    };
  }, []);

  return visible;
}
