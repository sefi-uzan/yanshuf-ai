import ChatWrapper from "@/components/chat/ChatWrapper";
import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    chatId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = params;

  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const { user } = session;

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${chatId}`);

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      userId: user.id,
    },
  });

  if (!chat) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-6.5rem)]">
      <div className="mx-auto w-full grow lg:flex">
        <div className="shrink-0 flex-[0.75] border-t border-primary-foreground lg:border-l lg:border-t-0">
          <ChatWrapper chatId={chat.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
