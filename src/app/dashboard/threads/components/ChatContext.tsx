import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/app/components/ui/use-toast";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { ReactNode, createContext, useEffect, useState } from "react";

type ChatContext = {
  handleSubmit: () => void;
  setAssistantId: (id: string) => void;
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  assistantId: string | undefined;
  threadId: string | null;
  setThreadId: any;
};

export const ChatContext = createContext<ChatContext>({
  handleSubmit: () => {},
  setAssistantId: () => {},
  setMessage: () => {},
  setThreadId: () => {},
  message: "",
  isLoading: false,
  assistantId: undefined,
  threadId: null,
});

interface Props {
  children: ReactNode;
}

export const ChatContextProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assistantId, setAssistantId] = useState<string>();
  const [threadId, setThreadId] = useQueryState("threadId");

  const { data: thread } = trpc.thread.getThread.useQuery({
    threadId,
  });

  useEffect(() => {
    if (thread?.assistantId) {
      setAssistantId(thread.assistantId);
    }
  }, [thread]);

  const { mutate: createAndRun } = trpc.thread.createAndRun.useMutation();
  const { mutate: runThread } = trpc.thread.runThread.useMutation();

  const { toast } = useToast();
  const utils = trpc.useUtils();
  const router = useRouter();

  const handleSubmit = () => {
    if (!threadId && assistantId) {
      setIsLoading(true);
      createAndRun(
        { assistantId, content: message },
        {
          onSuccess: (data) => {
            setThreadId(data.id);
            toast({
              title: "Success",
              description: "Message sent",
              variant: "default",
            });
            setMessage("");
            utils.thread.list.invalidate();
            router.replace(`/dashboard/threads?threadId=${data.id}`);
          },
          onError: (err) => {
            toast({
              title: "Error",
              description: err.message,
              variant: "destructive",
            });
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }
    if (threadId && assistantId) {
      setIsLoading(true);
      runThread(
        { assistantId, content: message, threadId },
        {
          onSuccess: (data) => {
            toast({
              title: "Success",
              description: "Message sent",
              variant: "default",
            });
            setMessage("");
          },
          onError: (err) => {
            toast({
              title: "Error",
              description: err.message,
              variant: "destructive",
            });
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        setThreadId,
        handleSubmit,
        message,
        isLoading,
        setAssistantId,
        setMessage,
        assistantId,
        threadId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
