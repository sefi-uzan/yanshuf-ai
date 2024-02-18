import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "@/app/components/pages/dashboard/settings/account/BillingForm";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <div className="w-full">
      <div className="space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Account</h3>
              <p className="text-sm text-muted-foreground">
                Control your subscription plan and billing information.
              </p>
            </div>
            <div className="shrink-0 bg-border h-[1px] w-full"></div>
            <form className="space-y-8"></form>
          </div>
        </div>
      </div>
      <BillingForm subscriptionPlan={subscriptionPlan} />
    </div>
  );
};

export default Page;
