"use client";

import { useSetOpen } from "@/app/components/hooks/useSetOpen";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardNavItem = {
  href: string;
  name: string;
  className: string;
};

const DashboardNavItem = ({ href, name, className }: DashboardNavItem) => {
  const pathname = usePathname();
  const { setOpen } = useSetOpen();

  return (
    <Link
      onClick={() => setOpen(false)}
      href={`${href}`}
      key={href}
      className={className}
    >
      {name}
    </Link>
  );
};

export default DashboardNavItem;
