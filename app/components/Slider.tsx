"use client";

import useEmblaCarousel from "embla-carousel-react";
import Icon from "./Icon";
import { LocaleDictionary } from "../lib/i18n/types";
import { FC, useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Text from "./Text";

export interface SliderSlideProps {
  img: StaticImageData;
  title: string;
  paragraph: string;
}

export interface SliderProps {
  t: LocaleDictionary;
  data: SliderSlideProps[];
}

const Slider: FC<SliderProps> = ({ t, data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(data.length);

  const syncSliderState = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());

    setCurrentSlide(emblaApi.selectedScrollSnap() + 1);
    setTotalSlides(emblaApi.scrollSnapList().length);
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

  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();

  return (
    <div className="slider-viewport v-box" ref={emblaRef}>
      <div className="slider-container h-box">
        {data.map((d, i) => (
          <div className="slider-slide h-box" key={i}>
            <div className="slider-slide-left">
              <Text>{d.title}</Text>
              <Text>{d.paragraph}</Text>
              <Text>
                {currentSlide} / {totalSlides}
              </Text>
            </div>
            <Image src={d.img} alt={d.title} />
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
