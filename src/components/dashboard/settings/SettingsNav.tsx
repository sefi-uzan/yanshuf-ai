"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsNavItems = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    name: "Account",
    href: "/dashboard/settings/account",
  },
  {
    name: "Integrations",
    href: "/dashboard/settings/integrations",
  },
  {
    name: "Subscription",
    href: "/dashboard/settings/subscription",
  },
];
const SettingsNav = () => {
  const pathname = usePathname();
  return (
    <aside className="mx-4 lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {settingsNavItems.map((item) => (
          <Link
            href={`${item.href}`}
            key={item.href}
            className={
              pathname === item.href
                ? "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start"
                : "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
            }
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsNav;
