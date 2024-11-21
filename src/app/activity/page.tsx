import AdvertisementDialog from "@components/ads/dialog";
import { getAdvertisements } from "@data/ads";

export default async function ActivityPage() {
  const advertisements = await getAdvertisements();

  return (
    <div className="mt-4 space-y-2.5">
      {advertisements.map((advertisement) => (
        <AdvertisementDialog advertisement={advertisement} key={advertisement.id} />
      ))}
    </div>
  );
}
