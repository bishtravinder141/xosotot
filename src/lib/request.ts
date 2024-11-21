import { BadRequestError, UnauthorizedError } from "@lib/error";
import { stringify } from "qs";
import "server-only";

export type RequestBody = BodyInit | object | null;
export type RequestMethod = "get" | "put" | "post" | "patch" | "delete";
export type RequestOptions = Pick<RequestInit, "next" | "signal"> & {
  params?: object;
  headers?: HeadersInit;
};

export async function request<T>(url: string, method: RequestMethod, data?: RequestBody, options?: RequestOptions) {
  const params = stringify(options?.params, {
    skipNulls: true,
    arrayFormat: "repeat",
    addQueryPrefix: true,
    encodeValuesOnly: true,
  });
  const headers = new Headers(options?.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const init: RequestInit = {
    next: options?.next,
    body: data as Exclude<RequestBody, object>,
    method: method.toUpperCase(),
    signal: options?.signal,
    headers,
  };

  const response = await fetch(`${url}${params}`, init).catch((error: unknown) => {
    if (error instanceof Error) {
      // eslint-disable-next-line -- -
      console.error(`Fetch failed for "${url}${params}".`, error.message);
    } else {
      // eslint-disable-next-line -- -
      console.error(`Fetch failed for "${url}${params}".`);
    }

    throw error;
  });

  const result = await response.text();

  if (response.ok) {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return JSON.parse(result) as T;
    }

    return result as T;
  }

  let message = result;

  if (response.headers.get("Content-Type")?.includes("application/json")) {
    const json = JSON.parse(result) as object;

    if ("error" in json && typeof json.error === "string") {
      message = json.error;
    }

    if ("message" in json && typeof json.message === "string") {
      message = json.message;
    }
  }

  if (response.status === 400) {
    throw new BadRequestError(message);
  }

  if (response.status === 401) {
    throw new UnauthorizedError(message);
  }

  // eslint-disable-next-line -- -
  console.error(`Fetch failed for "${url}${params}" ${response.status} ${response.statusText}.`);

  throw new Error(message);
}
