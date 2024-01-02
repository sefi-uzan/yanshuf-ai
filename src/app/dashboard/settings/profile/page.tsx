import ProfileForm from "@/components/dashboard/settings/profile/ProfileForm";

const Page = () => {
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
      <ProfileForm />
    </div>
  );
};

export default Page;
