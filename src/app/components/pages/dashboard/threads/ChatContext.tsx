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
  fileUrl: string | undefined;
  setFileUrl: (url: string | undefined) => void;
};

export const ChatContext = createContext<ChatContext>({
  handleSubmit: () => {},
  setAssistantId: () => {},
  setMessage: () => {},
  setThreadId: () => {},
  setFileUrl: () => {},
  message: "",
  isLoading: false,
  assistantId: undefined,
  threadId: null,
  fileUrl: undefined,
});

interface Props {
  children: ReactNode;
}

export const ChatContextProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assistantId, setAssistantId] = useState<string>();
  const [threadId, setThreadId] = useQueryState("threadId");
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const { mutate: getThread } = trpc.thread.getThread.useMutation();
  const { mutate: getFile } = trpc.file.getFile.useMutation();
  const { mutate: getAssistant } = trpc.assistant.retrieve.useMutation();

  useEffect(() => {
    if (threadId) {
      getThread(
        {
          threadId,
        },
        {
          onSuccess(data) {
            if (data?.assistantId) {
              setAssistantId(data.assistantId);
              getAssistant(
                { id: data.assistantId },
                {
                  onSuccess(data) {
                    if (data?.fileId) {
                      getFile(
                        { id: data.fileId },
                        {
                          onSuccess(data) {
                            setFileUrl(data?.url);
                          },
                        }
                      );
                    }
                  },
                }
              );
            }
          },
        }
      );
    }
  }, [getThread, threadId, getAssistant, getFile]);

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
            utils.message.list.refetch();
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
        setFileUrl,
        fileUrl,
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
