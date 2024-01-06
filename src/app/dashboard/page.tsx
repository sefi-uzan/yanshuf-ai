import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const { user } = session;

  if (!user) redirect("/auth-callback?origin=nouser");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=nodbuser");

  return <></>;
};

export default Page;
