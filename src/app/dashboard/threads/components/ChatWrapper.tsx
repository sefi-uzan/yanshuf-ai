"use client";
import { trpc } from "@/app/_trpc/client";
import { Card } from "@/app/components/ui/card";
import { ChatContext, ChatContextProvider } from "./ChatContext";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { SelectAssistant } from "./SelectAssistant";
import { useContext } from "react";

const ChatWrapper = () => {
  return (
    <Card className="w-3/4 flex flex-col">
      <SelectAssistant />
      <Messages />
      <ChatInput />
    </Card>
  );
};

export default ChatWrapper;
