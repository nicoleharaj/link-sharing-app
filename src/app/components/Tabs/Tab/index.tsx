"use client";

import { cn } from "@/app/utils/merge";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { LinkIcon, ProfileIcon } from "../../UI/Icons";

interface Tab extends LinkProps {
  children?: ReactNode;
  className?: string;
  icon: string | StaticImport;
}

export default function Tab({
  children,
  className,
  icon,
  href,
  ...props
}: Tab) {
  const pathname = usePathname();

  const svgStyle =
    pathname === href ? "fill-purple" : "fill-gray group-hover:fill-purple";

  return (
    <Link
      className={cn([
        "group flex items-center justify-center gap-2 rounded-lg px-[27px] py-[11px] text-heading-sm font-semibold text-gray",
        pathname === href
          ? "bg-purple-light text-purple"
          : "bg-transparent hover:text-purple",
        className,
      ])}
      href={href}
      {...props}
    >
      {icon === "link" ? (
        <LinkIcon className={svgStyle} />
      ) : icon === "profile" ? (
        <ProfileIcon className={svgStyle} />
      ) : (
        <LinkIcon className={svgStyle} />
      )}
      <span className="sr-only tablet:not-sr-only">{children}</span>
    </Link>
  );
}
