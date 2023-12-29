import BillingForm from "@/components/BillingForm";
import YouTrackForm from "@/components/YouTrackForm";
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
