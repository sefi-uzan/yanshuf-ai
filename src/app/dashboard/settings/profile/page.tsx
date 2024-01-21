"use client";
import { trpc } from "@/app/_trpc/client";

import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import ProfileForm from "./components/ProfileForm";

const Page = () => {
  const { data, isLoading } = trpc.user.getUserInfo.useQuery();
  while (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;

  if (!data?.user) redirect("/sign-in");

  return (
    <div className="w-full">
      <div className="space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex-1">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how other will see you on the site.
              </p>
            </div>
            <div className="shrink-0 bg-border h-[1px] w-full"></div>
            <form className="space-y-8"></form>
          </div>
        </div>
      </div>
      <ProfileForm user={data.user} />
    </div>
  );
};

export default Page;
