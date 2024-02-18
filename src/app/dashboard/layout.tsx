import { getAuthSession } from "@/config/auth-options";
import MaxWidthWrapper from "../components/providers/MaxWidthWrapper";
import DashboardNav from "@/app/components/pages/dashboard/navigation/DashboardNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });
  return (
    <MaxWidthWrapper>
      <DashboardNav>{children}</DashboardNav>
    </MaxWidthWrapper>
  );
}
