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
    <div className="relative flex flex-col w-full flex-grow px-4">
      <div className="relative">
        <Textarea
          minRows={1}
          ref={textareaRef}
          maxRows={4}
          autoFocus
          onHeightChange={(height) => {
            if (textareaRef.current) {
              textareaRef.current.style.height = `${height}px`;
            }
          }}
          onChange={handleInputChange}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              addMessage();

              if (textareaRef.current) {
                textareaRef.current.focus();
              }
            }
          }}
          placeholder="Enter your question..."
          className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        />

        <Button
          disabled={isLoading || isDisabled}
          className="absolute bottom-1.5 right-[8px]"
          aria-label="send message"
          onClick={() => {
            addMessage();

            if (textareaRef.current) {
              textareaRef.current.focus();
            }
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};


export default ChatInput;
