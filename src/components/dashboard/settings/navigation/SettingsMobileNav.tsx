"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardNavItem from "../../navigation/DashboardNavItem";
import { settingsNavItems } from "./SettingsNav";

const SettingsMobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };
  return (
    <>
      <div className="flex md:hidden">
        <Menu
          onClick={toggleOpen}
          className="relative z-10 h-5 w-5 cursor-pointer"
        />
        {isOpen ? (
          <div className="fixed animate-in slide-in-from-top-5 fade-in-20">
            <ul className="absoluteborder-b border-primary-foreground shadow-xl grid pt-5 bg-background">
              <>
                {settingsNavItems.map((item) => (
                  <li key={item.name}>
                    <DashboardNavItem
                      item={item}
                      closeOnCurrent={closeOnCurrent}
                    />
                  </li>
                ))}
              </>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SettingsMobileNav;
