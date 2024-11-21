type NumberOptions = {
  notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
  signDisplay?: "auto" | "never" | "always" | "exceptZero" | undefined;
  fractionDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

type DecimalOptions = NumberOptions & {
  style: "decimal";
};

type PercentOptions = NumberOptions & {
  style: "percent";
};

type CurrencyOptions = NumberOptions & {
  style: "currency";
  currency?: string;
};

type PhoneOptions = {
  style: "phone";
};

type FormatOptions = DecimalOptions | PercentOptions | CurrencyOptions | PhoneOptions;

export function format(value: unknown, options: FormatOptions): string {
  if (options.style === "decimal" && typeof value === "number") {
    return value.toLocaleString("en", {
      notation: options.notation ?? "standard",
      signDisplay: options.signDisplay,
      minimumFractionDigits: options.fractionDigits ?? options.minimumFractionDigits ?? 0,
      maximumFractionDigits: options.fractionDigits ?? options.maximumFractionDigits ?? 1,
    });
  }

  if (options.style === "percent" && typeof value === "number") {
    return value.toLocaleString("en", {
      style: "percent",
      notation: options.notation ?? "standard",
      signDisplay: options.signDisplay,
      minimumFractionDigits: options.fractionDigits ?? options.minimumFractionDigits ?? 0,
      maximumFractionDigits: options.fractionDigits ?? options.maximumFractionDigits ?? 1,
    });
  }

  if (options.style === "currency" && typeof value === "number") {
    const match = /[^\d]+/.exec(
      (0).toLocaleString("en", {
        style: "currency",
        currency: (options.currency ?? "VND").toUpperCase(),
      }),
    )!;

    return `${format(value, {
      style: "decimal",
      notation: options.notation ?? "standard",
      signDisplay: options.signDisplay,
      minimumFractionDigits: options.fractionDigits ?? options.minimumFractionDigits ?? 2,
      maximumFractionDigits: options.fractionDigits ?? options.maximumFractionDigits ?? 2,
    })} ${match[0].trim()}`;
  }

  throw new Error(`Invalid type "${typeof value}" for "${options.style}" style formatting`);
}
