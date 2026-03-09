"use client";

import { FC } from "react";
import Icon from "../Icon";

interface SidemenuCloseBtnProps {
  onClick: () => void;
}

const SidemenuClosebtn: FC<SidemenuCloseBtnProps> = ({ onClick }) => {
  return (
    <button type="button" className="p-ham-nav" onClick={onClick}>
      <Icon name="close" />
    </button>
  );
};

export default SidemenuClosebtn;
