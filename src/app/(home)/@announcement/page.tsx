import AnnouncementDialog from "@components/announcement/dialog";
import { getAnnouncement } from "@data/announcement";
import { UnauthorizedError } from "@lib/error";
import dynamic from "next/dynamic";

async function HomeAnnouncementSlot() {
  const announcement = await getAnnouncement().catch((error: unknown) => {
    if (error instanceof UnauthorizedError) {
      return null;
    }

    throw error;
  });

  return !announcement ? null : <AnnouncementDialog>{announcement}</AnnouncementDialog>;
}

export default dynamic(() => Promise.resolve(HomeAnnouncementSlot), {
  loading: () => null,
  ssr: false,
});
