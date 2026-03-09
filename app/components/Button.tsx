import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

export interface ButtonProps {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  variant?: "outline" | "brand" | "dark";
}

const Button: FC<ButtonProps & PropsWithChildren> = ({
  href = "",
  className = "",
  size = "md",
  variant = "brand",
  children,
}) => {
  const buttonCls = clsx(
    "p-btn",
    `p-btn--${size}`,
    `p-btn--${variant}`,
    className,
  );

  return (
    <Link href={href} className={buttonCls}>
      {children}
    </Link>
  );
};

export default Button;
