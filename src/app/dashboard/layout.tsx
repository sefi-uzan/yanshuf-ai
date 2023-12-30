import DashboardContext from "@/components/dashboard/DashboardContext";
import MaxWidthWrapper from "@/components/providers/MaxWidthWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <DashboardContext>{children}</DashboardContext>
    </MaxWidthWrapper>
  );
}
