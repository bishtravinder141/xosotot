import api from "@lib/api";
import "server-only";

export type Advertisement = {
  id: number;
  title: string;
  link: string;
  type: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type AdvertisementResponse = {
  advertisements: Advertisement[];
};

export async function getAdvertisements() {
  const { advertisements } = await api.get<AdvertisementResponse>("/advertisements", {
    next: { revalidate: /* 1h */ 3_600 },
  });

  return advertisements;
}
