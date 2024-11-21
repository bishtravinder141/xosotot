import { getRequestConfig } from "next-intl/server";
import "server-only";

export default getRequestConfig(async (params) => ({
  messages: await import(`../dictionaries/${params.locale}.json`).then((module) => module.default),
}));
