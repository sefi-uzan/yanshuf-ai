"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

const ChatCreation = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const { toast } = useToast();

  const { mutate: createChat, isLoading } = trpc.chats.createChat.useMutation({
    onSuccess: (chat) => {
      router.push(`/dashboard/${chat.id}`);
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
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        createChat({ name });
      }}
    >
      <div className="grid grid-cols-3 items-center gap-2">
        <Label htmlFor="baseUrl" className="col-span-1">
          Name
        </Label>
        <Input
          id="baseUrl"
          value={name}
          className="col-span-2 h-8"
          type="text"
          onChange={(e) => {
            e.preventDefault;
            setName(e.target.value);
          }}
        />
      </div>
      <Button type="submit" variant="secondary" className="col-span-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
};

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

      <DialogContent>
        <ChatCreation />
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatButton;
