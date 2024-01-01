type NavbarItem = {
  name: string;
  href: string;
  private: boolean;
  subscribed?: NavbarItem;
};

export const navbarItems: NavbarItem[] = [
  {
    name: "Pricing",
    href: "/pricing",
    private: false,
  },
  {
    name: "Sign in",
    href: "/auth/sign-in",
    private: false,
  },
  {
    name: "Get started",
    href: "/auth/sign-up",
    private: false,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    private: true,
  },
  {
    name: "Settings",
    href: "/dashboard/settings/profile",
    private: true,
  },
  {
    name: "Upgrade",
    href: "/pricing",
    private: true,
    subscribed: {
      name: "Subscription",
      href: "/dashboard/settings/subscription",
      private: true,
    },
  },
  {
    name: "Sign out",
    href: "/auth/sign-out",
    private: true,
  },
];
