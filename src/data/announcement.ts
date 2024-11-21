import api from "@lib/api";
import { getLocale } from "@lib/translation";
import "server-only";

export async function getAnnouncement() {
  const lang = getLocale();

  const response = await api.get<string | object>("/announcement", {
    next: { revalidate: /* 1h */ 3_600 },
    params: { lang },
  });

  return typeof response === "object" ? null : response;
}

type Announcement = {
  id: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
};

type AnnouncementsResponse = {
  data: Announcement[];
  total: number;
  per_page: number;
  current_page: number;
};

export async function getAnnouncements(page: number) {
  const lang = getLocale();

  const response = await api.get<AnnouncementsResponse>("/announcements", {
    // next: { revalidate: /* 1h */ 3_600 },
    params: { lang, page },
  });

  return {
    data: response.data,
    meta: {
      pagination: {
        page: response.current_page,
        total: response.total,
        limit: response.per_page,
      },
    },
  };
}
