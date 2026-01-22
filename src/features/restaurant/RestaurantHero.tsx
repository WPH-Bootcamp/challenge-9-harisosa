
import Image from "next/image";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

type RestaurantHeroGalleryProps = {
  images: string[];
  name: string;
};

export const RestaurantHeroGallery = ({ images, name }: RestaurantHeroGalleryProps) => {
  const gallery = React.useMemo(() => images.filter(Boolean), [images]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const [a, b, c, d] = gallery;

  return (
    <>

      <div className="md:hidden px-4">
        <div ref={emblaRef} className="overflow-hidden rounded-2xl">
          <div className="flex">
            {gallery.map((src, idx) => (
              <div key={`${src}-${idx}`} className="min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-16/10 bg-muted">
                  <Image
                    src={src}
                    alt={`${name} photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {gallery.length > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-2">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                className={[
                  "h-2 w-2 rounded-full transition-opacity",
                  idx === selectedIndex ? "opacity-100 bg-black" : "opacity-30 bg-black",
                ].join(" ")}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="hidden md:grid grid-cols-12 gap-3 h-90">
        <div className="col-span-7 rounded-2xl overflow-hidden relative bg-muted">
          {a ? <Image src={a} alt={name} fill className="object-cover" priority /> : null}
        </div>

        <div className="col-span-5 grid grid-rows-2 gap-3">
          <div className="rounded-2xl overflow-hidden relative bg-muted">
            {b ? <Image src={b} alt={`${name} photo 2`} fill className="object-cover" /> : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden relative bg-muted">
              {c ? <Image src={c} alt={`${name} photo 3`} fill className="object-cover" /> : null}
            </div>
            <div className="rounded-2xl overflow-hidden relative bg-muted">
              {d ? <Image src={d} alt={`${name} photo 4`} fill className="object-cover" /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
