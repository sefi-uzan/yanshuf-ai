import DashboardNavigation from "@/components/DashboardNavigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <DashboardNavigation />
      {children}
    </MaxWidthWrapper>
  );
}
