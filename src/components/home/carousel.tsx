import Carousel from "@components/primitive/carousel";
import Skeleton from "@components/shared/skeleton";
import type { Options } from "flickity";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const carousel: Options = {
  autoPlay: true,
  wrapAround: true,
  prevNextButtons: false,
};

function HomeCarousel(props: PropsWithChildren) {
  return (
    <Carousel
      className="flickity-viewport:aspect-2/1 flickity-viewport:w-full flickity-viewport:rounded-lg"
      options={carousel}
    >
      {props.children}
    </Carousel>
  );
}

export default dynamic(() => Promise.resolve(HomeCarousel), {
  loading: () => (
    <div className="space-y-2.5">
      <Skeleton className="aspect-2/1 rounded-lg" />
      <Skeleton className="mx-auto h-2.5 w-24 rounded-full" />
    </div>
  ),
  ssr: false,
});
