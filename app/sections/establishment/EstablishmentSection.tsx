import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC } from "react";

import Slider, { SliderSlideProps } from "@/app/components/Slider";

export interface EstablishmentSectionProps {
  t: LocaleDictionary;
}

const sliderData = (t: LocaleDictionary): SliderSlideProps[] => [
  {
    img: "/imgs/ej1.png",
    title: t.establishmentSection.slide1.title,
    paragraph: t.establishmentSection.slide1.paragraph,
  },
  {
    img: "/imgs/ej2.png",
    title: t.establishmentSection.slide2.title,
    paragraph: t.establishmentSection.slide2.paragraph,
  },
  {
    img: "/imgs/ej3.png",
    title: t.establishmentSection.slide3.title,
    paragraph: t.establishmentSection.slide3.paragraph,
  },
  {
    img: "/imgs/ej4.png",
    title: t.establishmentSection.slide4.title,
    paragraph: t.establishmentSection.slide4.paragraph,
  },
];

const EstablishmentSection: FC<EstablishmentSectionProps> = ({ t }) => {
  return (
    <section
      className="section establishment-section customer-section v-box"
      id="establishment-journey"
    >
      <div className="section-inner v-box align-items-center">
        <div className="v-box section-header">
          <Text
            fontSize="2xl"
            htmlElement="h3"
            fontVariant="lineca"
            className="section-title"
          >
            {t.establishmentSection.title}
          </Text>
          <Text fontSize="lg" className="section-paragraph">
            {t.establishmentSection.paragraph}
          </Text>
        </div>
        <Slider data={sliderData(t)} />
      </div>
    </section>
  );
};

export default EstablishmentSection;
