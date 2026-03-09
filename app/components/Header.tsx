"use client";

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routes } from "../routes";
import Text from "./Text";
import Icon from "./Icon";
import Sidemenu from "./sidemenu/Sidemenu";

export type Locale = "en" | "sr";

export interface HeaderLabels {
  logo: string;
  nav: string[];
  contact: string;
  navBar: string;
  localeOption1: string;
  localeOption2: string;
  selectLabel: string;
}

export interface HeaderProps {
  locale: Locale;
  translation: HeaderLabels;
}

const Header: FC<HeaderProps> = ({ locale, translation }) => {
  const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navItems = translation.nav.slice(0, 6);

  const handleLocaleChange = (event: any) => {
    const nextLocale = event.target.value as Locale;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const params = new URLSearchParams(searchParams.toString());
    params.set("locale", nextLocale);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleOpenSideMenu = () => setIsSidemenuOpen(true);
  const handleCloseSideMenu = () => setIsSidemenuOpen(false);

  useEffect(() => {
    if (!isSidemenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidemenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidemenuOpen]);

  return (
    <>
      <header className="p-header">
        <div className="p-header__left">
          <Logo ariaLabel={translation.logo} />
        </div>

        <nav className="p-header__nav" aria-label={translation.navBar}>
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="p-header__nav-link"
            >
              <Text htmlElement="span">{item}</Text>
            </Link>
          ))}
        </nav>

        <div className="p-header__right">
          <div className="p-header__lang">
            <label className="sr-only" htmlFor="locale-select">
              {translation.selectLabel}
            </label>
            <select
              id="locale-select"
              className="p-header__lang-select"
              value={locale}
              onChange={handleLocaleChange}
              aria-label={translation.selectLabel}
            >
              <option value="en">{translation.localeOption1}</option>
              <option value="sr">{translation.localeOption2}</option>
            </select>
          </div>
          <Button href={routes.contact} size="sm" variant="outline">
            {translation.contact}
            <Icon name="arrow-right" />
          </Button>
          <button
            type="button"
            className="p-ham-nav"
            aria-label="Open menu"
            aria-expanded={isSidemenuOpen}
            onClick={handleOpenSideMenu}
          >
            <Icon name="ham-menu" />
          </button>
        </div>
      </header>

      {isSidemenuOpen && (
        <Sidemenu
          items={navItems}
          t={{ header: { logo: translation.logo } }}
          onClose={handleCloseSideMenu}
        />
      )}
    </>
  );
};

export default Header;
