import Icon, { IconName } from "@/app/components/Icon";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import React from "react";

interface AISectionProps {
  t: LocaleDictionary;
}

type CardPosition = "top" | "right" | "bottom" | "left";

interface AICard {
  icon: IconName;
  title: string;
  listHeader: string;
  listItems: string[];
  position: CardPosition;
}

const getCards = (t: LocaleDictionary): AICard[] => [
  {
    icon: "customer",
    title: t.aiSection.firstCardTitle,
    listHeader: t.aiSection.firstCardListHeader,
    listItems: t.aiSection.firstCardListItems,
    position: "top",
  },
  {
    icon: "servers",
    title: t.aiSection.secondCardTitle,
    listHeader: t.aiSection.secondCardListHeader,
    listItems: t.aiSection.secondCardListItems,
    position: "right",
  },
  {
    icon: "management",
    title: t.aiSection.thirdCardTitle,
    listHeader: t.aiSection.thirdCardListHeader,
    listItems: t.aiSection.thirdCardListItems,
    position: "bottom",
  },
  {
    icon: "kitchen",
    title: t.aiSection.fourthCardTitle,
    listHeader: t.aiSection.fourthCardListHeader,
    listItems: t.aiSection.fourthCardListItems,
    position: "left",
  },
];

const AISection: React.FC<AISectionProps> = ({ t }) => {
  const cards = getCards(t);

  return (
    <section className="section ai-section v-box" id="ai-360°">
      <div className="section-inner v-box justify-content-start">
        <div className="v-box section-header">
          <Text
            fontSize="2xl"
            htmlElement="h3"
            fontVariant="lineca"
            className="section-title"
          >
            {t.aiSection.title}
          </Text>
          <Text fontSize="lg">{t.aiSection.paragraph}</Text>
        </div>

        <div className="ai-grid">
          <div className="ai-grid-connector">
            <div className="ai-grid-connector-inner"></div>
          </div>

          <div className="ai-grid__center">
            <Icon name="ai" />
          </div>

          {cards.map((card) => (
            <div
              key={card.position}
              className={`ai-card ai-card--${card.position}`}
            >
              <div className={`dot ${card.position}`}></div>
              <div className="ai-card__content v-box">
                <div className="ai-card__title h-box align-items-center">
                  <Icon name={card.icon} width={40} height={40} />
                  <Text fontSize="lg" fontVariant="lineca">
                    {card.title}
                  </Text>
                </div>
                <Text fontSize="xs" className="ai-card__subtitle">
                  {card.listHeader}
                </Text>
                <ul className="ai-card__list">
                  {card.listItems.map((item) => (
                    <li key={item}>
                      <Text fontSize="xs" htmlElement="span">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISection;
