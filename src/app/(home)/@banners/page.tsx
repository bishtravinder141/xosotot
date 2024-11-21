import HomeCarousel from "@components/home/carousel";
import { getCarouselImages } from "@data/details";
import NextImage from "next/image";

export default async function HomeBannersSlot() {
  const images = await getCarouselImages();

  return images.length < 1 ? null : (
    <HomeCarousel>
      {images.map((image) =>
        image.url ? (
          <a className="flex w-full" href={image.url} key={image.id} rel="noopener noreferrer" target="_blank">
            <NextImage alt="Banner" className="aspect-2/1 w-full" height={195} priority src={image.image} width={390} />
          </a>
        ) : (
          <div className="flex w-full" key={image.id}>
            <NextImage alt="Banner" className="aspect-2/1 w-full" height={195} priority src={image.image} width={390} />
          </div>
        ),
      )}
    </HomeCarousel>
  );
}
