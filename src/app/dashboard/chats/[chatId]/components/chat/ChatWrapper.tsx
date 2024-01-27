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
      <div className="max-h-[calc(100vh-8rem)] flex flex-col flex-1">
        <Messages chatId={chatId} />

        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
