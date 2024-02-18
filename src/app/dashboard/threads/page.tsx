"use client";
import { ChatContextProvider } from "@/app/components/pages/dashboard/threads/ChatContext";
import ChatWrapper from "@/app/components/pages/dashboard/threads/ChatWrapper";
import ThreadList from "@/app/components/pages/dashboard/threads/ThreadList";

const Page = () => {
  return (
    <div className="flex flex-row h-[calc(100vh-18rem)]">
      <ChatContextProvider>
        <ThreadList />
        <ChatWrapper />
      </ChatContextProvider>
    </div>
  );
};

export default Page;
