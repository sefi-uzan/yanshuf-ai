"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type DashboardNavItem = {
  href: string;
  name: string;
};

const NavbarItem = ({ name, href }: DashboardNavItem) => {
  return (
    <Link
      onClick={() => {}}
      href={`${href}`}
      key={href}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "sm",
        }),
        "flex flex-grow "
      )}
    >
      {name}
    </Link>
  );
};

export default NavbarItem;
