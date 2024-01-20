"use client";

import { usePathname } from "next/navigation";
import DashboardNavItem from "../../components/navigation/DashboardNavItem";

export const settingsNavItems = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    name: "Integrations",
    href: "/dashboard/settings/integrations",
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
          <DashboardNavItem key={item.name} item={item} />
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
