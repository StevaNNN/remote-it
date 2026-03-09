import { createElement, FC, PropsWithChildren } from "react";
import localFont from "next/font/local";
import clsx from "clsx";

type TextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

const textSizeClassByKey: Record<TextSize, string> = {
  xs: "p-text-xs",
  sm: "p-text-sm",
  md: "p-text-md",
  lg: "p-text-lg",
  xl: "p-text-xl",
  "2xl": "p-text-2xl",
  "3xl": "p-text-3xl",
  "4xl": "p-text-4xl",
  "5xl": "p-text-5xl",
};

export interface TextProps {
  htmlElement?: string;
  className?: string;
  fontThickness?: "bold" | "regular" | "book";
  fontStyle?: "normal" | "italic";
  fontVariant?: "sf" | "lineca";
  textGradient?: boolean;
  fontSize?: TextSize;
}

const sfRegular = localFont({ src: "../resources/fonts/sf.ttf" });
const sfItalic = localFont({ src: "../resources/fonts/sf-italic.ttf" });

const linecaRegular = localFont({
  src: "../resources/fonts/lineca-regular.ttf",
});
const linecaBook = localFont({ src: "../resources/fonts/lineca-book.ttf" });
const linecaBold = localFont({ src: "../resources/fonts/lineca-bold.ttf" });

const Text: FC<TextProps & PropsWithChildren> = ({
  children,
  htmlElement = "p",
  fontThickness = "regular",
  fontVariant = "sf",
  fontStyle = "normal",
  className = "",
  textGradient = false,
  fontSize = "sm",
}) => {
  const getFontClassName = () => {
    if (fontVariant === "sf") {
      return fontStyle === "italic" ? sfItalic.className : sfRegular.className;
    }

    switch (fontThickness) {
      case "bold":
        return linecaBold.className;
      case "book":
        return linecaBook.className;
      default:
        return linecaRegular.className;
    }
  };

  const textCls = clsx(
    "p-text",
    textSizeClassByKey[fontSize],
    className,
    getFontClassName(),
    {
      "p-text-gradient": textGradient,
    },
  );
  return createElement(htmlElement, { className: textCls, children });
};

export default Text;
