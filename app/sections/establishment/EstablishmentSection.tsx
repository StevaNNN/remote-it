import Image from "next/image";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC } from "react";

import e1 from "@/app/resources/imgs/ej1.png";
import e2 from "@/app/resources/imgs/ej2.png";
import e3 from "@/app/resources/imgs/ej3.png";
import e4 from "@/app/resources/imgs/ej4.png";

import Slider, { SliderSlideProps } from "@/app/components/Slider";

export interface EstablishmentSectionProps {
  t: LocaleDictionary;
}

const sliderData = (t: LocaleDictionary): SliderSlideProps[] => [
  {
    img: e1,
    title: t.establishmentSection.slide1.title,
    paragraph: t.establishmentSection.slide1.paragraph,
  },
  {
    img: e2,
    title: t.establishmentSection.slide2.title,
    paragraph: t.establishmentSection.slide2.paragraph,
  },
  {
    img: e3,
    title: t.establishmentSection.slide3.title,
    paragraph: t.establishmentSection.slide3.paragraph,
  },
  {
    img: e4,
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
