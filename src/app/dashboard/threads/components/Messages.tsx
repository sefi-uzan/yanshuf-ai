import { trpc } from "@/app/_trpc/client";
import { useContext, useEffect, useState } from "react";
import { Messages } from "@/types/types";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { ChatContext } from "./ChatContext";

const Messages = () => {
  const { threadId } = useContext(ChatContext);
  const { data: dbMessages, isLoading } = trpc.message.list.useQuery({
    threadId,
  });
  const [messages, setMessages] = useState<Messages>();

  useEffect(() => {
    if (dbMessages) {
      setMessages(dbMessages);
    } else {
      setMessages(undefined);
    }
  }, [threadId, dbMessages]);

  return (
    <div className="h-[calc(100vh-24rem)] overflow-y-auto flex flex-col pb-4 w-full">
      <div className="flex flex-col-reverse flex-grow gap-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </div>
        ) : (
          messages?.map((message, index) => {
            return (
              <Card key={index} className="w-fit border-0">
                <CardHeader className="p-2">{message.role}</CardHeader>
                <CardContent
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Messages;
