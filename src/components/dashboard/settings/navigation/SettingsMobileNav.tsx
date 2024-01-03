"use client";

import { Menu } from "lucide-react";

import { useSetOpen } from "@/components/hooks/useSetOpen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import DashboardNavItem from "../../navigation/DashboardNavItem";
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
