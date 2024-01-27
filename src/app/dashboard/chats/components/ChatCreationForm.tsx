"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { trpc } from "@/app/_trpc/client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  fileId: z.string().cuid(),
  fileName: z.string(),
});

const ChatCreationForm = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing(
    isSubscribed ? "freePlanUploader" : "proPlanUploader"
  );
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createChat(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="chat name" {...field} />
              </FormControl>
              <FormDescription>This is your chat name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Dropzone
                  multiple={false}
                  maxFiles={1}
                  onDrop={async (acceptedFile) => {
                    const res = await startUpload(acceptedFile);
                    if (!res || !res[0].serverData?.fileId) {
                      return toast({
                        title: "Something went wrong",
                        description: "Please try again later",
                        variant: "destructive",
                      });
                    }

                    form.setValue("fileId", res[0].serverData?.fileId);
                    form.setValue("fileName", res[0].name);
                  }}
                >
                  {({ getRootProps }) => (
                    <div
                      {...getRootProps()}
                      className={cn(
                        "border border-dashed border-primary rounded-lg h-20 w-full flex items-center justify-center",
                        isUploading && "pointer-events-none"
                      )}
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <FormDescription>
                          {form.getValues("fileName")
                            ? form.getValues("fileName")
                            : "Drag and drop a file or click to upload."}
                        </FormDescription>
                      )}
                    </div>
                  )}
                </Dropzone>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="disabled:bg-secondary-foreground"
          disabled={isUploading || !form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ChatCreationForm;
