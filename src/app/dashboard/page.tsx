import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const { user } = session;

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return <></>;
};

export default Page;
