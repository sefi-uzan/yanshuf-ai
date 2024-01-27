"use client";

import { buttonVariants } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import DashboardNavItem from "./DashboardNavItem";

const dashboardNavItems = [
  {
    name: "Dashboard",
    href: "/dashboard/",
  },
  {
    name: "Chats",
    href: "/dashboard/chats",
  },
  {
    name: "Settings",
    href: "/dashboard/settings/profile",
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
            <DashboardNavItem
              name={item.name}
              href={item.href}
              key={item.href}
              className={
                pathname.split("/")[2] === item.href.split("/")[2]
                  ? buttonVariants({ variant: "secondary" })
                  : buttonVariants({ variant: "ghost" })
              }
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      <Card>{children}</Card>
    </div>
  );
};

export default DashboardNav;
