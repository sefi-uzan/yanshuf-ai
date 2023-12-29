"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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

interface DashboardNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardNavigation = ({
  className,
  ...props
}: DashboardNavigationProps) => {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex items-center", className)} {...props}>
          {dashboardNavItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "flex h-7 items-center justify-center rounded-full pr-4 text-center text-sm transition-colors hover:text-primary",
                pathname === item.href
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
};

export default DashboardNavigation;
