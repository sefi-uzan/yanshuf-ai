import SettingsMobileNav from "./components/SettingsMobileNav";
import SettingsNav from "./components/SettingsNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="p-10 pb-16">
        <div className="space-y-0.5">
          <div className="flex flex-row justify-start items-center space-x-4">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <div className="md:hidden block">
              <SettingsMobileNav />
            </div>
          </div>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        <div className="flex lg:flex-row md:flex-col">
          <SettingsNav />
          {children}
        </div>
      </div>
    </>
  );
}
