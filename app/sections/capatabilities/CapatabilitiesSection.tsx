import Icon from "@/app/components/Icon";
import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC } from "react";

export interface CapabilitiesSectionProps {
  t: LocaleDictionary;
}

const cardsData = (t: LocaleDictionary) => [
  {
    boldText: t.capabilities.card1.boldText,
    text: t.capabilities.card1.text,
  },
  {
    boldText: t.capabilities.card2.boldText,
    text: t.capabilities.card2.text,
  },
  {
    boldText: t.capabilities.card3.boldText,
    text: t.capabilities.card3.text,
  },
  {
    boldText: t.capabilities.card4.boldText,
    text: t.capabilities.card4.text,
  },
  {
    boldText: t.capabilities.card5.boldText,
    text: t.capabilities.card5.text,
  },
];

const CapabilitiesSection: FC<CapabilitiesSectionProps> = ({ t }) => {
  return (
    <section
      className="section capabilities-section v-box"
      id="key-capabilities"
    >
      <div className="section-inner v-box">
        <div className="v-box section-header">
          <Text
            fontSize="2xl"
            htmlElement="h3"
            fontVariant="lineca"
            className="section-title"
          >
            {t.capabilities.title}
          </Text>
          <Text className="section-paragraph" fontSize="lg">
            {t.capabilities.paragraph}
          </Text>
        </div>
        <div className="section-cards h-box flex-wrap">
          {cardsData(t).map((c, i) => {
            return (
              <div className="h-box card flex-1">
                <Icon name="check" />
                <Text fontSize="md">
                  <Text
                    fontSize="md"
                    htmlElement="span"
                    className="font-weight-semibold"
                  >
                    {c.boldText}{" "}
                  </Text>
                  {c.text}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
