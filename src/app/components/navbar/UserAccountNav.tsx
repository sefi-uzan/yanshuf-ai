"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useSetOpen } from "../hooks/useSetOpen";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavbarItem from "./NavbarItem";
import { navbarItems } from "./NavbarItems";

interface UserAccountNavProps {
  email: string | undefined;
  name: string;
  imageUrl?: string | null;
  isSubscribed: boolean;
}

const UserAccountNav = ({
  email,
  imageUrl,
  name,
  isSubscribed,
}: UserAccountNavProps) => {
  const { open, setOpen } = useSetOpen();

  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)}>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          className="rounded-full h-8 w-8 aspect-square"
          data-testid="user-account-menu"
        >
          <Avatar className="relative w-8 h-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
                <Image
                  fill
                  src="/avatar.jpg"
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2" align="end">
        <div className="flex items-center justify-start gap-2 p-2 ">
          <div
            className="flex flex-col space-y-0.5 leading-none"
            data-testid="user-details"
          >
            {name && <p className="font-medium text-sm">{name}</p>}
            {email && (
              <p className="w-[180px] max-w-[200px] truncate text-xs">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {navbarItems.map((item) => {
          return item.private ? (
            <DropdownMenuItem
              data-testid="user-account-navbar-item"
              key={item.name}
              className="cursor-pointer"
              onClick={(open) => setOpen(!open)}
            >
              {isSubscribed && item.subscribed ? (
                <NavbarItem
                  name={item.subscribed.name}
                  href={item.subscribed.href}
                />
              ) : (
                <NavbarItem name={item.name} href={item.href} />
              )}
            </DropdownMenuItem>
          ) : null;
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Button
            data-testid="user-account-navbar-item"
            variant="ghost"
            className="flex flex-grow justify-start px-0"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
