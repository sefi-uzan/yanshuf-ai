import MaxWidthWrapper from "../components/providers/MaxWidthWrapper";
import DashboardNav from "./components/navigation/DashboardNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <DashboardNav>{children}</DashboardNav>
    </MaxWidthWrapper>
  );
}
