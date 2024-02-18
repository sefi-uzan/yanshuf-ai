"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Assistant, DBFile } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";

const formSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  fileId: z.string().optional(),
  fileName: z.string().optional(),
});
type EditAssistantFormProps = {
  assistant: Assistant;
  setOpen: (open: boolean) => void;
};

const EditAssistantForm = ({ assistant, setOpen }: EditAssistantFormProps) => {
  const { startUpload } = useUploadThing("fileUploader");
  const utils = trpc.useUtils();
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { mutate: editAssistant, isLoading: isCreating } =
    trpc.assistant.modify.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: assistant.id,
      name: assistant.name,
      description: assistant.description || undefined,
      instructions: assistant.instructions || undefined,
      fileName: assistant.fileId || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    editAssistant(values, {
      onSuccess: (data) => {
        toast({
          title: "Assistant modified",
          description: `${data.name} details have been modified successfully`,
          variant: "default",
        });
        utils.assistant.list.invalidate();
        setOpen(false);
      },
    });
  }
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit assistant</SheetTitle>
        <SheetDescription>
          Make changes to your assistant here.
        </SheetDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="assistant name" {...field} />
                  </FormControl>
                  <FormDescription>This is your assistant name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe this assistant, this is optional.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Input placeholder="instructions..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Give instructions to your assistant, this is optional.
                  </FormDescription>
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
                        setIsUploading(true);
                        const res = await startUpload(acceptedFile);

                        if (!res) {
                          return toast({
                            title: "Upload to bucket failed",
                            description:
                              "failed while uploading to uploadthing",
                            variant: "destructive",
                          });
                        }

                        const data = new FormData();
                        data.set("file", acceptedFile[0]);
                        data.set("fileUrl", res[0].url);

                        const response = await fetch("/api/file", {
                          method: "POST",
                          body: data,
                        });

                        const json: DBFile = await response.json();

                        form.setValue("fileId", json.id);
                        form.setValue("fileName", json.name);

                        form.trigger("fileId");
                        setIsUploading(false);
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
                                : "Drag and drop or click to upload a file"}
                            </FormDescription>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </FormControl>
                  <FormDescription>
                    Uploading a file will override existing file.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="disabled:bg-secondary-foreground">
              {isCreating || isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Edit"
              )}
            </Button>
          </form>
        </Form>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditAssistantForm;
