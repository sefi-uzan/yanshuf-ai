import { Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { useContext, useRef } from "react";
import { ChatContext } from "./ChatContext";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex justify-between items-end gap-x-2">
      <Textarea
        rows={1}
        ref={textareaRef}
        maxRows={6}
        autoFocus
        onChange={handleInputChange}
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            addMessage();

            textareaRef.current?.focus();
          }
        }}
        placeholder="Enter your question..."
        className="resize-none"
      />

      <Button
        disabled={isLoading || isDisabled}
        className=""
        aria-label="send message"
        onClick={() => {
          addMessage();

          textareaRef.current?.focus();
        }}
      >
        <Send className="" />
      </Button>
    </div>
  );
};

export default ChatInput;
