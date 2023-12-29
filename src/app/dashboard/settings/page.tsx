import BillingForm from "@/components/BillingForm"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import { redirect } from "next/navigation";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  if (!subscriptionPlan?.isSubscribed) redirect("/");
  return <BillingForm subscriptionPlan={subscriptionPlan} />;
};

export default Page