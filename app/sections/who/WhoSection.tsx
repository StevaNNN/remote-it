import { FC } from "react";
import Image from "next/image";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";

export interface WhoSectionProps {
  t: LocaleDictionary;
}

const sectionCardData = (t: LocaleDictionary) => [
  {
    image: "/imgs/restaurants-cafes.png",
    title: t.whoSection.slide1Title,
    flipText: t.whoSection.slide1FlipText,
  },
  {
    image: "/imgs/bars-nightlife.png",
    title: t.whoSection.slide2Title,
    flipText: t.whoSection.slide2FlipText,
  },
  {
    image: "/imgs/stadiums-arenas.png",
    title: t.whoSection.slide3Title,
    flipText: t.whoSection.slide3FlipText,
  },
  {
    image: "/imgs/hotels-resorts.png",
    title: t.whoSection.slide4Title,
    flipText: t.whoSection.slide4FlipText,
  },
  {
    image: "/imgs/retailAndShopping.png",
    title: t.whoSection.slide5Title,
    flipText: t.whoSection.slide5FlipText,
  },
];

const splitTitleByAmpersand = (title: string) => {
  const [firstPart, secondPart] = title.split(/\s*&\s*/);
  return { firstPart, secondPart };
};

const WhoSection: FC<WhoSectionProps> = ({ t }) => {
  return (
    <section className="section who-section v-box" id="who-its-for">
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
