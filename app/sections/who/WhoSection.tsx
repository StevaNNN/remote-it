import Image from "next/image";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC } from "react";

import restaurantsCafes from "@/app/resources/imgs/restaurants-cafes.png";
import barsNightlife from "@/app/resources/imgs/bars-nightlife.png";
import stadiumsArenas from "@/app/resources/imgs/stadiums-arenas.png";
import hotelsResorts from "@/app/resources/imgs/hotels-resorts.png";

export interface WhoSectionProps {
  t: LocaleDictionary;
}

const sectionCardData = (t: LocaleDictionary) => [
  {
    image: restaurantsCafes,
    title: t.whoSection.slide1Title,
    flipText: t.whoSection.slide1FlipText,
  },
  {
    image: barsNightlife,
    title: t.whoSection.slide2Title,
    flipText: t.whoSection.slide2FlipText,
  },
  {
    image: stadiumsArenas,
    title: t.whoSection.slide3Title,
    flipText: t.whoSection.slide3FlipText,
  },
  {
    image: hotelsResorts,
    title: t.whoSection.slide4Title,
    flipText: t.whoSection.slide4FlipText,
  },
];

const splitTitleByAmpersand = (title: string) => {
  const [firstPart, secondPart] = title.split(/\s*&\s*/);
  return { firstPart, secondPart };
};

const WhoSection: FC<WhoSectionProps> = ({ t }) => {
  return (
    <section className="section who-section v-box" id="who-it’s-for">
      <div className="section-inner v-box">
        <div className="v-box section-header">
          <Text
            fontSize="2xl"
            htmlElement="h3"
            fontVariant="lineca"
            className="section-title"
          >
            {t.whoSection.title}
          </Text>
          <Text fontSize="lg" className="section-paragraph">
            {t.whoSection.paragraph}
          </Text>
        </div>
        <div className="section-cards">
          {sectionCardData(t).map((card, id) => {
            const { firstPart, secondPart } = splitTitleByAmpersand(card.title);
            return (
              <div key={id} className="who-card">
                <div className="who-card-inner">
                  <div className="who-card-front">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <Text
                      fontSize="xl"
                      fontVariant="lineca"
                      className="who-card-title"
                    >
                      {firstPart + " &"}
                      {
                        <>
                          <br /> {secondPart}
                        </>
                      }
                    </Text>
                  </div>
                  <div className="who-card-back">
                    <Text fontSize="md" className="who-card-flip-text">
                      {card.flipText}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoSection;
