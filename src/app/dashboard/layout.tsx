import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import MaxWidthWrapper from "@/components/providers/MaxWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <DashboardNavigation />
      {children}
    </MaxWidthWrapper>
  );
}
