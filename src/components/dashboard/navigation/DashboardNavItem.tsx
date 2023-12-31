"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardNavItem = {
  item: {
    href: string;
    name: string;
  };
  closeOnCurrent?: (href: string) => void;
};

const DashboardNavItem = ({ item, closeOnCurrent }: DashboardNavItem) => {
  const pathname = usePathname();

  return (
    <Link
      onClick={() => closeOnCurrent && closeOnCurrent(item.href)}
      href={`${item.href}`}
      key={item.href}
      className={
        pathname === item.href
          ? "flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start"
          : "flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
      }
    >
      {item.name}
    </Link>
  );
};

export default DashboardNavItem;
