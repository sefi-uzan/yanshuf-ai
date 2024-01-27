import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import ChatWrapper from "./components/chat/ChatWrapper";
import { trpc } from "@/app/_trpc/client";

interface PageProps {
  params: {
    chatId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { chatId } = params;

  const session = await getAuthSession();

  if (!session?.user.id) return new Response("Unauthorized", { status: 401 });

  const { data: chat } = trpc.chats.getChat.useQuery({
    id: chatId,
  });

  if (!chat) notFound();

  return <ChatWrapper chatId={chat.id} />;
};

export default Page;
