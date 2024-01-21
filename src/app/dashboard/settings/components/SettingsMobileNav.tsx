"use client";

import { Menu } from "lucide-react";

import { useSetOpen } from "@/app/components/hooks/useSetOpen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import DashboardNavItem from "../../components/navigation/DashboardNavItem";
import { settingsNavItems } from "./SettingsNav";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

const SettingsMobileNav = () => {
  const { open, setOpen } = useSetOpen();
  const pathname = usePathname();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Menu className="relative z-50 h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2" align="end">
        {settingsNavItems.map((item) => {
          return (
            <DropdownMenuItem key={item.name}>
              <DashboardNavItem
                name={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? buttonVariants({ variant: "secondary" })
                    : buttonVariants({ variant: "ghost" }),
                  "flex flex-grow"
                )}
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default SettingsMobileNav;
