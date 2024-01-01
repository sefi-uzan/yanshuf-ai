import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import MaxWidthWrapper from "../providers/MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import MobileNav from "./MobileNav";
import NavbarItem from "./NavbarItem.";
import { navbarItems } from "./NavbarItems";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full backdrop-blur-lg transition-all mb-2 border-b">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Yanshuf.ai</span>
          </Link>
          <div className="sm:hidden flex items-center justify-between gap-x-2">
            <ModeToggle />
            {!user ? (
              <MobileNav />
            ) : (
              <UserAccountNav
                name={
                  !user.given_name || !user.family_name
                    ? "Your Account"
                    : `${user.given_name} ${user.family_name}`
                }
                email={user.email ?? ""}
                imageUrl={user.picture ?? ""}
                isSubscribed={subscriptionPlan?.isSubscribed}
              />
            )}
          </div>
          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <ModeToggle />
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
                <ModeToggle />
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                  isSubscribed={subscriptionPlan?.isSubscribed}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
