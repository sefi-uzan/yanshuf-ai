import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Chats from "./components/Chats";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) redirect("/");

  const dbUser = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!dbUser) redirect("/");

  const subscriptionPlan = await getUserSubscriptionPlan();

  return <Chats subscriptionPlan={subscriptionPlan} />;
};

export default Page;
