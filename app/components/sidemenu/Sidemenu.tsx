"use client";

import Link from "next/link";
import { FC } from "react";
import Text from "../Text";
import Logo from "../Logo";
import SidemenuClosebtn from "./SidemenuCloseBtn";

export interface SidemenuProps {
  items: string[];
  t: any;
  onClose: () => void;
}

const Sidemenu: FC<SidemenuProps> = ({ items, t, onClose }) => {
  return (
    <aside className="p-aside-wrap" onClick={onClose}>
      <div
        className="p-aside-menu"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-aside-header">
          <Logo ariaLabel={t.header.logo} />
          <SidemenuClosebtn onClick={onClose} />
        </div>
        <nav className="p-aside-menu-nav">
          {items.map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="p-aside-menu-nav-link"
              onClick={onClose}
            >
              <Text htmlElement="span" fontVariant="lineca" fontSize="lg">
                {item}
              </Text>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidemenu;
