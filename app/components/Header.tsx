"use client";

import Link from "next/link";
import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routes } from "../routes";
import { useActiveSection } from "../hooks/useActiveSection";
import { useSidemenu } from "../hooks/useSidemenu";
import { Locale } from "../lib/i18n/locale";
import { LocaleDictionary } from "../lib/i18n/types";
import Button from "./Button";
import Logo from "./Logo";
import Text from "./Text";
import Icon from "./Icon";
import Sidemenu from "./Sidemenu";

export interface HeaderProps {
  locale: Locale;
  t: LocaleDictionary;
}

const toSlug = (item: string) => item.toLowerCase().replaceAll(" ", "-");

const Header: FC<HeaderProps> = ({ locale, t }) => {
  const navItems = t.header.nav.slice(0, 6);
  const { activeHash, scrollToSection, scrollToTop } =
    useActiveSection(navItems);
  const sidemenu = useSidemenu();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const params = new URLSearchParams(searchParams.toString());
    params.set("locale", nextLocale);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <header className="p-header h-box align-items-center">
        <div className="p-header__left justify-content-start h-box">
          <Logo ariaLabel={t.header.logo} onClick={scrollToTop} />
        </div>

        <nav
          className="p-header__nav h-box align-items-center justify-content-center"
          aria-label={t.header.navBar}
        >
          {navItems.map((item) => {
            const slug = toSlug(item);
            return (
              <Link
                key={item}
                href={`/#${slug}`}
                className={`h-box align-items-center justify-content-center p-header__nav-link${activeHash === slug ? " active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(slug);
                }}
              >
                <Text htmlElement="span">{item}</Text>
              </Link>
            );
          })}
        </nav>

        <div className="p-header__right h-box align-items-center justify-content-end">
          <div className="p-header__lang">
            <label className="sr-only" htmlFor="locale-select">
              {t.header.selectLabel}
            </label>
            <select
              id="locale-select"
              className="p-header__lang-select"
              value={locale}
              onChange={handleLocaleChange}
              aria-label={t.header.selectLabel}
            >
              <option value="en">{t.header.localeOption1}</option>
              <option value="sr">{t.header.localeOption2}</option>
            </select>
          </div>
          <Button
            href={routes.contact}
            size="sm"
            variant="outline"
            className="animate-button"
          >
            <Text htmlElement="span">{t.header.contact}</Text>
            <Icon name="arrow-right" width={20} height={20} />
          </Button>
          <button
            type="button"
            className="p-ham-nav h-box align-items-center justify-content-center"
            aria-label="Open menu"
            aria-expanded={sidemenu.isOpen}
            onClick={sidemenu.open}
          >
            <Icon name="ham-menu" />
          </button>
        </div>
      </header>

      {sidemenu.isVisible && (
        <Sidemenu
          items={navItems}
          activeHash={activeHash}
          onActiveChange={scrollToSection}
          isClosing={sidemenu.isClosing}
          t={t}
          onClose={sidemenu.close}
        />
      )}
    </>
  );
};

export default Header;
