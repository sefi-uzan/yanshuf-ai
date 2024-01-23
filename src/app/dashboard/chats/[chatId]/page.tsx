import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import ChatWrapper from "../components/chat/ChatWrapper";

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

  if (!user?.id) redirect(`/auth-callback?origin=dashboard/${chatId}`);

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      userId: user.id,
    },
  });

  if (!chat) notFound();

  return <ChatWrapper chatId={chat.id} />;
};

export default Page;
