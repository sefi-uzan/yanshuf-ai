"use client";
import { ChatContextProvider } from "./components/ChatContext";
import ChatWrapper from "./components/ChatWrapper";
import ThreadList from "./components/ThreadList";

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
