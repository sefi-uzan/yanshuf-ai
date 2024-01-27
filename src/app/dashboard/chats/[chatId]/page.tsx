import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import ChatWrapper from "./components/chat/ChatWrapper";
import PdfRenderer from "./components/pdf/PdfRenderer";

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

  if (!user?.id) return new Response("Unauthorized", { status: 401 });

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      userId: user.id,
    },
    select: {
      File: true,
    },
  });

  if (!chat?.File) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-7rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 sm:px-6 lg:pl-8 xl:flex-1">
            {/* Main area */}
            <PdfRenderer url={chat.File.url} />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default Page;
