"use client";

import { useEffect } from "react";

export default function AutoZoom() {
  useEffect(() => {
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    const keydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && [61, 107, 173, 109, 187, 189].includes(event.keyCode)) {
        event.preventDefault();
      }
    };

    const gesture = (event: Event) => {
      event.preventDefault();

      // @ts-expect-error -- -
      document.body.style.zoom = 1;
    };

    document.addEventListener("wheel", wheel, {
      passive: false,
    });
    document.addEventListener("keydown", keydown);
    document.addEventListener("gestureend", gesture);
    document.addEventListener("gesturestart", gesture);
    document.addEventListener("gesturechange", gesture);

    return function cancel() {
      document.removeEventListener("wheel", wheel);
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("gestureend", gesture);
      document.removeEventListener("gesturestart", gesture);
      document.removeEventListener("gesturechange", gesture);
    };
  }, []);

  return null;
}
