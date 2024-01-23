"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Loader2 } from "lucide-react";

const ChatCreation = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const { toast } = useToast();

  const { mutate: createChat, isLoading } = trpc.chats.createChat.useMutation({
    onSuccess: (chat) => {
      router.push(`/dashboard/chats/${chat.id}`);
    },
    onError: (error) => {
      toast({
        title: "Chat was not created",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createChat({ name });
      }}
    >
      <div className="grid grid-cols-4 items-center justify-between mt-4">
        <Label htmlFor="baseUrl" className="col-span-1">
          Name
        </Label>
        <Input
          id="baseUrl"
          value={name}
          className="col-span-3"
          type="text"
          onChange={(e) => {
            e.preventDefault;
            setName(e.target.value);
          }}
        />
      </div>
      <Button type="submit" variant="secondary" className="w-full mt-4">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
};

const CreateChatButton = () => {
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
        <ChatCreation />
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatButton;
