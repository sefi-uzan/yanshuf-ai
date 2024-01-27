"use client";

import { ChatContextProvider } from "./ChatContext";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface ChatWrapperProps {
  chatId: string;
}

const ChatWrapper = ({ chatId }: ChatWrapperProps) => {
  return (
    <ChatContextProvider chatId={chatId}>
      <div className="relative min-h-full flex flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col">
          <Messages chatId={chatId} />
          <ChatInput />
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
