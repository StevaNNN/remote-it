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
    title: "Understand",
    paragraph:
      "Decode guest behavior with AI. AI captures preferences, spending patterns, allergens, feedback sentiment, ordering habits and timing.",
  },
  {
    img: c2,
    title: "Optimize",
    paragraph:
      "Turn intelligence into coordinated action. AI transforms behavioral insights into real-time operational guidance. It adjusts upsell prompts, prioritizes menu items, balances kitchen load, and supports staff decisions as service unfolds.",
  },
  {
    img: c3,
    title: "Predict",
    paragraph:
      "Anticipate demand before it impacts operations. AI analyzes patterns across orders, timing, inventory flow, and guest behavior to forecast table turns, staffing needs, and sell-through performance.",
  },
  {
    img: c4,
    title: "Grow",
    paragraph:
      "Convert intelligence into measurable growth. AI continuously refines pricing dynamics, loyalty triggers, offer timing, and experience personalization to increase revenue per guest, improve retention, and protect margins.",
  },
];

const CustomerSection: FC<CustomerSectionProps> = ({ t }) => {
  return (
    <section className="section customer-section v-box" id="customer-journey">
      <div className="section-inner v-box">
        <div className="v-box section-header">
          <Text
            fontSize="2xl"
            htmlElement="h3"
            fontVariant="lineca"
            className="section-title"
          >
            {t.customerSection.title}
          </Text>
          <Text fontSize="lg">{t.customerSection.paragraph}</Text>
        </div>
        <Slider data={sliderData(t)} t={t} />
      </div>
    </section>
  );
};

export default CustomerSection;
