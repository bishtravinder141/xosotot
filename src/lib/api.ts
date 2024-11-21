import type { RequestOptions as BaseRequestOptions, RequestBody, RequestMethod } from "@lib/request";
import { request as requestBase } from "@lib/request";
import type { User } from "@lib/session";
import { getSession } from "@lib/session";
import { headers } from "next/headers";
import "server-only";

type RequestOptions = Omit<BaseRequestOptions, "next"> & {
  next?: NextFetchRequestConfig | ((user: User | null) => NextFetchRequestConfig);
};

async function request<T>(url: string, method: RequestMethod, data?: RequestBody, options: RequestOptions = {}) {
  const $headers = new Headers(options.headers);
  const session = await getSession().catch(() => null);

  headers().forEach((value, key) => {
    if (key === "user-agent" || key.startsWith("x-forwarded-")) {
      $headers.set(key, value);
    }
  });

  if (session !== null) {
    $headers.set("Authorization", `Bearer ${session.token}`);
  }

  if (data instanceof URLSearchParams) {
    $headers.set("Content-Type", "application/x-www-form-urlencoded");

    //
  } else if (Object.prototype.toString.call(data) === "[object Object]") {
    $headers.set("Content-Type", "application/json");
    // eslint-disable-next-line no-param-reassign -- -
    data = JSON.stringify(data);

    //
  }

  if (typeof options.next === "function") {
    options.next = options.next(session?.user ?? null);
  }

  options.headers = $headers;

  return requestBase<T>(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, method, data, options as never);
}

const api = {
  get: <T = object>(url: string, options?: RequestOptions) => {
    return request<T>(url, "get", null, options);
  },
  put: <T = object>(url: string, data?: BodyInit | object | null, options?: RequestOptions) => {
    return request<T>(url, "put", data, options);
  },
  post: <T = object>(url: string, data?: BodyInit | object | null, options?: RequestOptions) => {
    return request<T>(url, "post", data, options);
  },
  delete: <T = object>(url: string, options?: RequestOptions) => {
    return request<T>(url, "delete", null, options);
  },
};

export default api;
