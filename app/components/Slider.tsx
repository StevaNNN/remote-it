"use client";

import useEmblaCarousel from "embla-carousel-react";
import Icon from "./Icon";
import { FC, useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Text from "./Text";

export interface SliderSlideProps {
  img: StaticImageData;
  title: string;
  paragraph: string;
}

export interface SliderProps {
  data: SliderSlideProps[];
}

const Slider: FC<SliderProps> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const syncSliderState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    syncSliderState();
    emblaApi.on("select", syncSliderState);
    emblaApi.on("reInit", syncSliderState);

    return () => {
      emblaApi.off("select", syncSliderState);
      emblaApi.off("reInit", syncSliderState);
    };
  }, [emblaApi, syncSliderState]);

  const prev = () => {
    emblaApi?.scrollPrev();
  };

  const next = () => {
    emblaApi?.scrollNext();
  };

  return (
    <div className="slider-viewport v-box" ref={emblaRef}>
      <div className="slider-container h-box">
        {data.map((d, i) => (
          <div
            className={`slider-slide h-box${i === currentSlide ? " active-slide" : ""}`}
            key={i}
          >
            <div className="slide-left v-box">
              <div className="flex-1 v-box justify-content-center top-text-wrap">
                <Text fontVariant="lineca" fontSize="xl">
                  {d.title}
                </Text>
                <Text fontSize="md">{d.paragraph}</Text>
              </div>
              <Text>
                {i + 1} / {data.length}
              </Text>
            </div>
            <div className="slide-right">
              <div className="bg-graphic" />
              <Image src={d.img} alt={d.title} />
            </div>
          </div>
        ))}
      </div>

      <div className="h-box justify-content-center align-items-center slider-actions-wrap">
        <button
          onClick={prev}
          disabled={!canScrollPrev}
          className={`slider-action-btn d-i-flex align-items-center justify-content-center ${!canScrollPrev ? "disabled" : ""}`}
        >
          <Icon name="arrow-chevron-left" width={20} height={20} />
        </button>

        <button
          onClick={next}
          disabled={!canScrollNext}
          className={`slider-action-btn d-i-flex align-items-center justify-content-center ${!canScrollNext ? "disabled" : ""}`}
        >
          <Icon name="arrow-chevron-right" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
