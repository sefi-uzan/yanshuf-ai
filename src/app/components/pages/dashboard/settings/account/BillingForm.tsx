"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useToast } from "@/app/components/ui/use-toast";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {
  const { toast } = useToast();

  const { mutate: createStripeSession, isLoading } =
    trpc.auth.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) window.location.href = url;
        if (!url) {
          toast({
            title: "There was a problem...",
            description: "Please try again in a moment",
            variant: "destructive",
          });
        }
      },
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createStripeSession();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            {subscriptionPlan.isSubscribed
              ? `You are currently on the ${subscriptionPlan.slug}
                plan.`
              : "You do not have an active subscription plan"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Button type="submit">
            {isLoading ? (
              <Loader2 className="mr-4 h-4 w-4 animate-spin" />
            ) : null}
            {subscriptionPlan.isSubscribed
              ? "Manage Subscription"
              : "Upgrade to PRO"}
          </Button>

          {subscriptionPlan.isSubscribed ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
};

export default BillingForm;
