import { FC } from "react";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import Image from "next/image";
import LogoSmall from "@/app/resources/logo-small.svg";
import Link from "next/link";
import Text from "@/app/components/Text";

import FooterLogo from "./FooterLogo";

export interface FooterSectionProps {
  t: LocaleDictionary;
}
const getContactHref = (key: string, value: string): string => {
  const hrefMap: Record<string, string> = {
    email: `mailto:${value}`,
    number: `tel:${value.replace(/\s/g, "")}`,
    street: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`,
  };

  return hrefMap[key] ?? "#";
};

const FooterSection: FC<FooterSectionProps> = ({ t }) => {
  return (
    <footer className="section footer-section">
      <div className="section-inner v-box">
        <div className="section-top ">
          <FooterLogo t={t} />
          <div className="h-box info-data">
            <div className="v-box list">
              <Text fontSize="lg" fontThickness="bold" htmlElement="h3">
                {t.footer.productsTitle}
              </Text>
              <div className="v-box list-items">
                {t.footer.products.map((product, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="d-i-flex align-items-center justify-content-center"
                  >
                    <Text>{product}</Text>
                  </Link>
                ))}
              </div>
            </div>
            <div className="v-box list">
              <Text fontSize="lg" fontThickness="bold" htmlElement="h3">
                {t.footer.contact.title}
              </Text>
              <div className="v-box list-items">
                {t.footer.contact.info.map((item, index) => {
                  const [key, value] = Object.entries(item)[0];
                  const href = getContactHref(key, value);
                  return (
                    <Link
                      key={index}
                      href={href}
                      {...(key === "street"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Text>{value}</Text>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-bottom h-box">
        {t.footer.links.map((link, index) => (
          <Link
            key={index}
            href="#"
            className="d-i-flex align-items-center justify-content-center"
          >
            <Text fontSize="xs">{link}</Text>
          </Link>
        ))}
        <div className="flex-1 h-box justify-content-end">
          <Image src={LogoSmall} alt={t.header.logo} />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
