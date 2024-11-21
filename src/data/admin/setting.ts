import api from "@lib/api";
import "server-only";

type Setting = {
  id: number;
  game_name: string;
  game_type: number;
  setting_name: string;
  setting_description: string;
  number: string;
  link: string | null;
  created_at: string | null;
  updated_at: string;
};

export async function getAdminSettings() {
  return api.get<Setting[]>("/game-settings", {
    next: { revalidate: /* 1h */ 3_600 },
  });
}
