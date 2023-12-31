import SettingsNav from "@/components/dashboard/settings/SettingsNav";

const Page = async () => {
  return (
    <>
      <div className="hidden p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SettingsNav />
          <div className="flex-1 lg:max-w-2xl">
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
      </div>
    </>
  );
};

export default Page;
