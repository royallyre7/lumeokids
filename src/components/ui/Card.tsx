import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  href,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  const classes = `${
    hover ? "card-hoverable cursor-pointer" : "card"
  } p-6 ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${classes} w-full text-left`}>
        {children}
      </button>
    );
  }

  return <div className={classes}>{children}</div>;
}
