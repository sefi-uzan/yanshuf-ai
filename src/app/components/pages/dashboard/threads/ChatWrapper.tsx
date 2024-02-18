"use client";
import { Card } from "@/app/components/ui/card";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import PdfRenderer from "./PdfRenderer";
import { SelectAssistant } from "./SelectAssistant";
import { useContext } from "react";
import { ChatContext } from "./ChatContext";

const ChatWrapper = () => {
  const { fileUrl } = useContext(ChatContext);
  return (
    <Card className="w-3/4 flex flex-col">
      <div className="flex flex-row justify-between">
        <SelectAssistant />
        {fileUrl && <PdfRenderer url={fileUrl} />}
      </div>
      <Messages />
      <ChatInput />
    </Card>
  );
};

export default ChatWrapper;
