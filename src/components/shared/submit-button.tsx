"use client";

import Spinner from "@components/shared/spinner";
import type { AllHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export default function SubmitButton(props: AllHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={twMerge("inline-flex items-center justify-center", props.className)}
      disabled={pending || props.disabled}
      type="submit"
    >
      {pending && <Spinner />}

      {props.children}
    </button>
  );
}
