"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import CreateAssistantForm from "./CreateAssistantForm";
import { useState } from "react";
import { buttonVariants } from "@/app/components/ui/button";

const CreateAssistantButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Create
      </DialogTrigger>
      <DialogContent>
        <CreateAssistantForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssistantButton;
