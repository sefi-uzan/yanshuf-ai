"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

type DashboardNavItem = {
  href: string;
  name: string;
};

const NavbarItem = ({ name, href }: DashboardNavItem) => {
  return (
    <Link
      href={`${href}`}
      key={href}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "sm",
        }),
        "flex flex-grow justify-start px-0"
      )}
    >
      {name}
    </Link>
  );
};

export default NavbarItem;
