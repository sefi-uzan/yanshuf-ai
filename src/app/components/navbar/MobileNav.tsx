"use client";

import { Menu } from "lucide-react";
import { useSetOpen } from "../hooks/useSetOpen";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavbarItem from "./NavbarItem.";
import { navbarItems } from "./NavbarItems";
import { Button } from "../ui/button";

const MobileNav = () => {
  const { open, setOpen } = useSetOpen();

  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navbarItems.map((item) => {
          return !item.private ? (
            <DropdownMenuItem
              key={item.name}
              className="cursor-pointer"
              onClick={(open) => setOpen(!open)}
            >
              <NavbarItem name={item.name} href={item.href} />
            </DropdownMenuItem>
          ) : null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
