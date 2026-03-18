import Image from "next/image";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC } from "react";

import c1 from "@/app/resources/imgs/cj1.png";
import c2 from "@/app/resources/imgs/cj2.png";
import c3 from "@/app/resources/imgs/cj3.png";
import c4 from "@/app/resources/imgs/cj4.png";

import Slider, { SliderSlideProps } from "@/app/components/Slider";

export interface CustomerSectionProps {
  t: LocaleDictionary;
}

const sliderData = (t: LocaleDictionary): SliderSlideProps[] => [
  {
    img: c1,
    title: t.customerSection.slide1.title,
    paragraph: t.customerSection.slide1.paragraph,
  },
  {
    img: c2,
    title: t.customerSection.slide2.title,
    paragraph: t.customerSection.slide2.paragraph,
  },
  {
    img: c3,
    title: t.customerSection.slide3.title,
    paragraph: t.customerSection.slide3.paragraph,
  },
  {
    img: c4,
    title: t.customerSection.slide4.title,
    paragraph: t.customerSection.slide4.paragraph,
  },
];

const CustomerSection: FC<CustomerSectionProps> = ({ t }) => {
  return (
    <section className="section customer-section v-box" id="customer-journey">
      <div className="section-inner v-box align-items-center">
        <div className="v-box section-header">
          <Text
            fontSize="2xl"
            htmlElement="h3"
            fontVariant="lineca"
            className="section-title"
          >
            {t.customerSection.title}
          </Text>
          <Text fontSize="lg" className="section-paragraph">
            {t.customerSection.paragraph}
          </Text>
        </div>
        <Slider data={sliderData(t)} />
      </div>
    </section>
  );
};

export default CustomerSection;
