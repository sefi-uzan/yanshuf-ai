"use client";

import { usePathname } from "next/navigation";
import DashboardNavItem from "@/app/components/pages/dashboard/navigation/DashboardNavItem";
import { buttonVariants } from "@/app/components/ui/button";

export const settingsNavItems = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    name: "Account",
    href: "/dashboard/settings/account",
  },
];
const SettingsNav = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:mx-4 lg:w-1/5 md:block">
      <nav className="flex lg:flex-col md:flex-row">
        {settingsNavItems.map((item) => (
          <DashboardNavItem
            name={item.name}
            href={item.href}
            key={item.href}
            className={
              pathname === item.href
                ? buttonVariants({ variant: "secondary" })
                : buttonVariants({ variant: "ghost" })
            }
          />
        ))}
      </nav>
      <div
        role="none"
        className="md:block lg:hidden shrink-0 bg-border h-[1px] w-full my-6"
      ></div>
    </aside>
  );
};

export default SettingsNav;
