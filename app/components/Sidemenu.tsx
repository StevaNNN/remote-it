"use client";

import Link from "next/link";
import { FC } from "react";
import Text from "./Text";
import Logo from "./Logo";
import Icon from "./Icon";
import Button from "./Button";
import { routes } from "../routes";
import { LocaleDictionary } from "../lib/i18n/types";

export interface SidemenuProps {
  items: string[];
  activeHash: string;
  onActiveChange: (hash: string) => void;
  isClosing: boolean;
  t: LocaleDictionary;
  onClose: () => void;
}

const toSlug = (item: string) => item.toLowerCase().replaceAll(" ", "-");

const Sidemenu: FC<SidemenuProps> = ({
  items,
  activeHash,
  onActiveChange,
  isClosing,
  t,
  onClose,
}) => {
  const handleMenuClick = (e: any) => e.stopPropagation();
  const handleLinkClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    onActiveChange(slug);
    onClose();
  };

  return (
    <aside
      className={`p-aside-wrap h-box justfiy-content-center${isClosing ? " is-closing" : ""}`}
      onClick={onClose}
    >
      <div className="p-aside-menu v-box" onClick={handleMenuClick}>
        <div className="p-aside-header align-items-center justify-content-between h-box">
          <Logo ariaLabel={t.header.logo} />
          <button type="button" className="p-ham-nav" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <nav className="p-aside-menu-nav v-box align-items-end">
          {items.map((item) => {
            const slug = toSlug(item);
            return (
              <Link
                key={item}
                href={`/#${slug}`}
                className={`h-box align-items-center p-aside-menu-nav-link${activeHash === slug ? " active" : ""}`}
                onClick={(e) => handleLinkClick(slug, e)}
              >
                <Text htmlElement="span" fontVariant="lineca" fontSize="lg">
                  {item}
                </Text>
              </Link>
            );
          })}
        </nav>
        <Button
          className="animate-button sidemenu-action-btn"
          href={routes.contact}
          size="md"
          variant={"brand"}
        >
          <Text htmlElement="span">{t.header.contact}</Text>
          <Icon name="arrow-right" width={20} height={20} color="#fff" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidemenu;
