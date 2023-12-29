import BillingForm from "@/components/dashboard/settings/BillingForm";
import YouTrackForm from "@/components/dashboard/settings/YouTrackForm";
import { getUserSubscriptionPlan } from "@/lib/stripe";

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
