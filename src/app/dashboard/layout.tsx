import DashboardNav from "@/components/dashboard/navigation/DashboardNav";
import MaxWidthWrapper from "@/components/providers/MaxWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <DashboardNav>{children}</DashboardNav>
    </MaxWidthWrapper>
  );
}
