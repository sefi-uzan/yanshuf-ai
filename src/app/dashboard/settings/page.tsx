import { trpc } from "@/app/_trpc/client";
import BillingForm from "@/components/BillingForm";
import YouTrackForm from "@/components/YouTrackForm";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { redirect } from "next/navigation";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <div>
      <YouTrackForm />
      <BillingForm subscriptionPlan={subscriptionPlan} />
    </div>
  );
};

export default Page;
