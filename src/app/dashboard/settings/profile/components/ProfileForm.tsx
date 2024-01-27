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
import { User } from "@/types/types";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import Dropzone from "react-dropzone";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string(),
  image: z.string(),
});

const ProfileForm = ({ user }: User) => {
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const utils = trpc.useUtils();
  const { toast } = useToast();

  if (!user) redirect("/auth/sign-in");

  const { mutate } = trpc.user.updateUserInfo.useMutation({
    onSuccess: () => {
      utils.user.getUserInfo.invalidate();
      toast({
        title: "Success",
        description: "Your details have been updated successfully",
        variant: "default",
      });
    },
    onMutate() {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Dropzone
                  multiple={false}
                  maxFiles={1}
                  onDrop={async (acceptedFile) => {
                    const res = await startUpload(acceptedFile);
                    if (!res) {
                      return toast({
                        title: "Something went wrong",
                        description: "Please try again later",
                        variant: "destructive",
                      });
                    }

                    form.setValue("image", res[0].url);
                  }}
                >
                  {({ getRootProps }) => (
                    <div
                      {...getRootProps()}
                      className={cn(
                        "border border-dashed border-primary rounded-lg h-20 w-20 flex items-center justify-center",
                        isUploading && "pointer-events-none"
                      )}
                      style={{
                        backgroundImage: "url(" + field.value + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "5rem 5rem",
                      }}
                    >
                      {isUploading && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                    </div>
                  )}
                </Dropzone>
              </FormControl>
              <FormDescription>
                Click to upload or drag and drop.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your real name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
