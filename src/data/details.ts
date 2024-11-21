import api from "@lib/api";
import "server-only";

type DetailsResponse = {
  total_users: number;
  total_bettings: number;
  online_players: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export async function getDetails() {
  return api.get<DetailsResponse>("/dashboard", {
    next: { revalidate: /* 1s */ 1 },
  });
}

type Image = {
  id: number;
  url: string;
  image_link: string;
  created_at: string;
  updated_at: string;
};

export async function getCarouselImages() {
  const response = await api.get<Image[]>("/dashboard-images", {});

  return response.map((item) => ({
    id: item.id,
    url: item.url ? item.url : null,
    image: item.image_link,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
}
