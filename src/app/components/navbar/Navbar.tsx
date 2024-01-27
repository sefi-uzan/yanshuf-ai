import { getAuthSession } from "@/config/auth-options";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import Link from "next/link";
import MaxWidthWrapper from "../providers/MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import MobileNav from "./MobileNav";
import NavbarItem from "./NavbarItem";
import { navbarItems } from "./NavbarItems";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full backdrop-blur-lg transition-all mb-2 border-b">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="flex z-40 font-semibold"
            data-testid="navbar-title"
          >
            <span>Yanshuf.ai</span>
          </Link>
          <div className="flex flex-row justify-between items-center">
            <ModeToggle />
            <div className="sm:hidden flex items-center justify-between gap-x-2">
              {!session?.user && <MobileNav />}
            </div>
            <div className="hidden items-center space-x-4 sm:flex">
              {!session?.user ? (
                <>
                  {navbarItems.map((item) => {
                    return !item.private ? (
                      <NavbarItem
                        key={item.name}
                        name={item.name}
                        href={item.href}
                      />
                    ) : null;
                  })}
                </>
              ) : (
                <>
                  <Link
                    data-testid={`navbar-item-dashboard`}
                    href="/dashboard"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
            {!!session?.user && (
              <UserAccountNav
                name={
                  !session.user?.name ? "Your Account" : `${session.user?.name}`
                }
                email={session.user?.email ?? ""}
                imageUrl={session.user?.image}
                isSubscribed={subscriptionPlan?.isSubscribed}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
