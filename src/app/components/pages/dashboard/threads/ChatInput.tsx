import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useContext, useRef } from "react";
import { ChatContext } from "./ChatContext";
import { Textarea } from "@/app/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

const ChatInput = () => {
  const { message, setMessage, handleSubmit, isLoading } =
    useContext(ChatContext);

  return (
    <div className="">
      <div className="flex items-center justify-center space-x-2 mx-auto">
        <Textarea
          minRows={1}
          maxRows={4}
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none w-[500px]"
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              handleSubmit();
            }
          }}
        />
        <Button
          disabled={isLoading}
          aria-label="send message"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
