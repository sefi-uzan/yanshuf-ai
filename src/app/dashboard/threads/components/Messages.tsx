import { trpc } from "@/app/_trpc/client";
import { useContext, useEffect, useState } from "react";
import { Messages } from "@/types/types";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { ChatContext } from "./ChatContext";
import { sanitizeAndStyleHTML } from "@/lib/utils";
import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";

const Messages = () => {
  const { threadId } = useContext(ChatContext);
  const { data: dbMessages, isLoading } = trpc.message.list.useQuery({
    threadId,
  });
  const [messages, setMessages] = useState<Messages>();

  useEffect(() => {
    if (dbMessages) {
      const sanitizedMessages = dbMessages.map((message) => ({
        ...message,
        content: sanitizeAndStyleHTML(message.content),
      }));
      setMessages(sanitizedMessages);
    } else {
      setMessages(undefined);
    }
  }, [threadId, dbMessages]);

  return (
    <ScrollArea className="h-[calc(100vh-24rem)] flex flex-col pb-4 w-full px-2">
      <div className="flex flex-col-reverse flex-grow gap-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </div>
        ) : (
          messages?.map((message, index) => {
            return (
              <Card key={index} className="w-fit border-0">
                <CardHeader className="p-2 font-bold">
                  {message.role}:
                </CardHeader>
                <CardContent
                  dangerouslySetInnerHTML={{
                    __html: message.content.join(" "),
                  }}
                />
              </Card>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
};

export default Messages;
