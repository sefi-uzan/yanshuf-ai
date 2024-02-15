"use client";
import { useEffect, useRef, useState } from "react";
import ThreadList from "./components/ThreadList";
import ChatWrapper from "./components/ChatWrapper";
import { useQueryState } from "nuqs";
import { trpc } from "@/app/_trpc/client";
import { ChatContextProvider } from "./components/ChatContext";

const Page = () => {
  const [threadId, setThreadId] = useQueryState("threadId");

  return (
    <div className="flex flex-row h-[calc(100vh-18rem)]">
      <ChatContextProvider threadId={threadId}>
        <ThreadList setThreadId={setThreadId} threadId={threadId} />

        <ChatWrapper />
      </ChatContextProvider>
    </div>
  );
};

export default Page;
