"use client";

import { buttonVariants } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
    name: "Integrations",
    href: "/dashboard/integrations",
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

  console.log(pathname.split("/"));

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className="flex items-center">
          {dashboardNavItems.map((item) => (
            <Link
              href={`${item.href}`}
              key={item.href}
              className={
                pathname.split("/")[2] === item.href.split("/")[2]
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
