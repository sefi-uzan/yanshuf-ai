"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import ChatCreationForm from "./ChatCreationForm";

const CreateChatButton = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Create Chat</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <ChatCreationForm isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatButton;
