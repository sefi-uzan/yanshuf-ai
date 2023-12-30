"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { buttonVariants } from "../ui/button";
import { ReactNode } from "react";

const dashboardNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

interface Props {
  children: ReactNode;
}

const DashboardContext = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className="flex items-center">
          {dashboardNavItems.map((item) => (
            <Link
              href={`${item.href}`}
              key={item.href}
              className={
                pathname === item.href
                  ? buttonVariants({ variant: "secondary" })
                  : buttonVariants({ variant: "ghost" })
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      {children}
    </div>
  );
};

export default DashboardContext;
