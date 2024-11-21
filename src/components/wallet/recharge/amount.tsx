"use client";

import { format } from "@lib/format";
import type { ChangeEvent } from "react";
import { useState } from "react";

type WalletRechargeAmountProps = {
  range: number[];
};

export default function WalletRechargeAmount(props: WalletRechargeAmountProps) {
  const [amount, setAmount] = useState(props.range[0]);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {props.range.map((value) => (
          <button
            className="rounded-lg px-2.5 py-3 text-xs font-bold text-blue-500 ring-1 ring-blue-500 data-[state=selected]:bg-blue-500 data-[state=selected]:text-white"
            data-state={value === amount ? "selected" : void 0}
            key={value}
            onClick={setAmount.bind(0, value)}
            type="button"
          >
            {value.toLocaleString("en-US", {
              style: "decimal",
              notation: "compact",
            })}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2.5 rounded-lg bg-white px-2 py-2.5">
        <span className="text-sm font-bold">
          {format(0, { style: "currency", fractionDigits: 0 }).replaceAll(/\d|\s/g, "")}
        </span>
        <input
          className="w-full text-xs text-black"
          inputMode="numeric"
          min={props.range[0]}
          name="amount"
          onChange={onChange}
          required
          type="number"
          value={amount}
        />
      </label>
    </>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.valueAsNumber);
  }
}
