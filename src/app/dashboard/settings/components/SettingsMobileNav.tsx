"use client";

import { Menu } from "lucide-react";

import { useSetOpen } from "@/app/components/hooks/useSetOpen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import DashboardNavItem from "../../components/navigation/DashboardNavItem";
import { settingsNavItems } from "./SettingsNav";

const SettingsMobileNav = () => {
  const { open, setOpen } = useSetOpen();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Menu onClick={() => {}} className="relative z-50 h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2" align="end">
        {settingsNavItems.map((item) => (
          <DashboardNavItem item={item} key={item.name} />
        ))}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMobileNav;
