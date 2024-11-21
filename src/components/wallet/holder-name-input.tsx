"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";

type HolderNameInputProps = {
  name: string;
  placeholder?: string;
};

export default function HolderNameInput(props: HolderNameInputProps) {
  const [value, setValue] = useState("");

  return (
    <input
      className="w-full rounded-lg bg-white px-2 py-2.5 text-xs text-black"
      name={props.name}
      onChange={onChange}
      placeholder={props.placeholder}
      required
      type="text"
      value={value}
    />
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value.replace(/[^A-z\s]+/g, "").toUpperCase());
  }
}
