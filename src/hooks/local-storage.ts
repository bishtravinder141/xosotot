"use client";

import type { SetStateAction } from "react";
import { useSyncExternalStore } from "react";

function subscribe(handler: VoidFunction) {
  addEventListener("storage", handler);

  return function cancel() {
    removeEventListener("storage", handler);
  };
}

function getSnapshot(key: string) {
  return localStorage.getItem(key);
}

function getServerSnapshot() {
  return null;
}

type Options<T> = {
  encoder?: (data: T) => string | null;
  decoder?: (data: string | null) => T;
};

export default function useLocalStorage<T = string | null>(key: string, options?: Options<T>) {
  const encode = options?.encoder ?? ((data: T) => data as string | null);
  const decode = options?.decoder ?? ((data: string | null) => data as T);

  const value = useSyncExternalStore(subscribe, getSnapshot.bind(0, key), getServerSnapshot);
  const decoded = decode(value);

  return [decoded, setValue] as const;

  function setValue(state: SetStateAction<T>) {
    const action = typeof state === "function" ? (state as (data: T) => T) : () => state as T;

    const newValue = encode(action(decoded));

    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, newValue);
    }

    dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue,
        oldValue: value,
      }),
    );
  }
}
