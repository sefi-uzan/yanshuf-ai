"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavbarItem from "./NavbarItem.";
import { navbarItems } from "./NavbarItems";
import { useSetOpen } from "../hooks/useSetOpen";

const MobileNav = () => {
  const { open, setOpen } = useSetOpen();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Menu onClick={() => {}} className="relative z-50 h-5 w-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2" align="end">
        {navbarItems.map((item) => {
          return !item.private ? (
            <DropdownMenuItem key={item.name} className="cursor-pointer">
              <NavbarItem name={item.name} href={item.href} />
            </DropdownMenuItem>
          ) : null;
        })}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
