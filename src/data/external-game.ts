import api from "@lib/api";
import "server-only";

type Game = {
  id: number;
  name: string;
  logo: string;
  link: string;
  show: number;
};

export async function getExternalGames() {
  return api.get<Game[]>("/more-games", {
    next: { revalidate: /* 1h */ 3_600 },
  });
}
