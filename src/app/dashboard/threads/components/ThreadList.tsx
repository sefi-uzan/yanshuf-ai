"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useContext } from "react";
import { ChatContext } from "./ChatContext";

const ThreadList = () => {
  const { data: threads, isLoading } = trpc.thread.list.useQuery();

  const { setThreadId, threadId, setAssistantId, setFileUrl } =
    useContext(ChatContext);

  return (
    <aside className="w-1/4 overflow-y-auto">
      <nav className="flex flex-col space-y-4 mr-4 ">
        <Button
          variant={threadId === null ? "default" : "outline"}
          onClick={() => {
            setThreadId(null);
            setAssistantId("");
            setFileUrl(undefined);
          }}
        >
          New Thread
        </Button>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[38px] w-[284.5px]" />
            <Skeleton className="h-[38px] w-[284.5px]" />
            <Skeleton className="h-[38px] w-[284.5px]" />
            <Skeleton className="h-[38px] w-[284.5px]" />
          </div>
        ) : (
          threads?.map((thread) => {
            return (
              <Button
                variant={threadId === thread.id ? "default" : "outline"}
                onClick={() => setThreadId(thread.id)}
                key={thread.id}
              >
                {thread.name}
              </Button>
            );
          })
        )}
      </nav>
    </aside>
  );
};

export default ThreadList;
