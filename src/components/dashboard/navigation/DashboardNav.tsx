"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { buttonVariants } from "../../ui/button";
import { ReactNode } from "react";
import { Card } from "../../ui/card";

const dashboardNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Chats",
    href: "/dashboard/chats",
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

interface Props {
  children: ReactNode;
}

const DashboardNav = ({ children }: Props) => {
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
      <Card>{children}</Card>
    </div>
  );
};

export default DashboardNav;
