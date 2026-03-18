import { FC } from "react";

import Image from "next/image";

import Text from "@/app/components/Text";
import HeroImage from "@/app/resources/imgs/hero.png";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import Button from "@/app/components/Button";
import { routes } from "@/app/routes";
import Icon from "@/app/components/Icon";
import { Locale } from "@/app/lib/i18n/locale";

interface HeroSectionProps {
  t: LocaleDictionary;
  locale: Locale;
}

const HeroSection: FC<HeroSectionProps> = ({ t, locale }) => {
  return (
    <section className="section h-box hero-section" id="hero">
      <div className="section-inner h-box">
        <div className="image-wrapper">
          <Image
            className="hero-img"
            src={HeroImage}
            alt={t.heroSection.imagAlt}
          />
        </div>
        <div className="v-box text-wrap align-items-start justify-content-center">
          <Text
            fontVariant="lineca"
            htmlElement="h2"
            fontSize="3xl"
            fontThickness="bold"
          >
            <Text
              htmlElement="span"
              textGradient
              fontSize="3xl"
              fontVariant="lineca"
              fontThickness="bold"
            >
              {t.heroSection.heroText1}
            </Text>{" "}
            {t.heroSection.heroText2}
          </Text>
          <Text fontSize="md">{t.heroSection.heroParagprah}</Text>
          <Button
            className="animate-button"
            href={`/${locale}/${routes.contact}`}
            size="md"
            variant={"brand"}
          >
            <Text htmlElement="span">{t.heroSection.actionBtnText}</Text>
            <Icon name="arrow-right" width={20} height={20} color="#fff" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
