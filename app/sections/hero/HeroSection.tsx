import { FC } from "react";

import Image from "next/image";

import Text from "@/app/components/Text";
import HeroImage from "@/app/resources/imgs/hero.png";
import { LocaleDictionary } from "../../lib/i18n/types";
import Button from "@/app/components/Button";
import { routes } from "@/app/routes";
import Icon from "@/app/components/Icon";

interface HeroSectionProps {
  t: LocaleDictionary;
}

const HeroSection: FC<HeroSectionProps> = ({ t }) => {
  return (
    <section className="h-box hero-section flex-wrap" id="hero">
      <Image
        className="hero-img"
        src={HeroImage}
        alt={t.heroSection.imagAlt}
        sizes="100vw"
      />
      <div className="v-box text-wrap align-items-start">
        <Text fontVariant="lineca" htmlElement="h2" fontSize="3xl">
          <Text
            htmlElement="span"
            textGradient
            fontSize="3xl"
            fontVariant="lineca"
          >
            {t.heroSection.heroText1}
          </Text>{" "}
          {t.heroSection.heroText2}
        </Text>
        <Text fontSize="md">{t.heroSection.heroParagprah}</Text>
        <Button
          className="animate-button"
          href={routes.contact}
          size="md"
          variant={"brand"}
        >
          <Text htmlElement="span">{t.heroSection.actionBtnText}</Text>
          <Icon name="arrow-right" width={20} height={20} color="#fff" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
