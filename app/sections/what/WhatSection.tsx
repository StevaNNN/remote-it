import Icon, { IconName } from "@/app/components/Icon";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC } from "react";

export interface WhatWeDoProps {
  t: LocaleDictionary;
}

const sectionCardData = (t: LocaleDictionary) => [
  {
    icon: "fast-ordering",
    title: t.whatSection.firstCardTitle,
    paragraph: t.whatSection.firstCardParagraph,
  },
  {
    icon: "fast-payment",
    title: t.whatSection.secondCardTitle,
    paragraph: t.whatSection.secondCardParagraph,
  },
  {
    icon: "ai-powered",
    title: t.whatSection.thirdCardTitle,
    paragraph: t.whatSection.thirdCardParagraph,
  },
];

const WhatSection: FC<WhatWeDoProps> = ({ t }) => {
  return (
    <section className="what-section v-box " id="what-we-do">
      <div className="v-box section-header">
        <Text fontSize="2xl" htmlElement="h3" fontVariant="lineca">
          {t.whatSection.title}
        </Text>
        <Text fontSize="lg">{t.whatSection.paragraph}</Text>
      </div>
      <div className="section-cards h-box flex-wrap">
        {sectionCardData(t).map((card, id) => {
          return (
            <div key={id} className="section-card v-box align-items-start">
              <div className="card-icon-wrap v-box align-items-center justify-content-center">
                <Icon width={60} height={60} name={card.icon as IconName} />
              </div>
              <div className="v-box card-text-wrap">
                <Text fontSize="xl" fontVariant="lineca">
                  {t.whatSection["title"]}
                </Text>
                <Text fontSize="md">{t.whatSection["paragraph"]}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatSection;
