"use client";

import EyeFill from "@components/icon/bootstrap/eye-fill";
import EyeSlashFill from "@components/icon/bootstrap/eye-slash-fill";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: number | string;
};

export default function PasswordField(props: PasswordFieldProps) {
  const { size = 24, ...attrs } = props;

  const [show, setShow] = useState(false);

  return (
    <div className={twMerge("flex rounded-lg bg-blue-100 px-3 py-2", props.className)}>
      <input {...attrs} className="flex-1 bg-transparent py-2 text-xs" type={show ? "text" : "password"} />
      <button onClick={setShow.bind(0, !show)} type="button">
        {show ? <EyeFill size={size} /> : <EyeSlashFill size={size} />}
      </button>
    </div>
  );
}
