"use client";

import { trpc } from "@/app/_trpc/client";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { format } from "date-fns";
import { FolderSync, Ghost, Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/components/ui/button";
import CreateChatButton from "@/components/dashboard/chats/CreateChatButton";

const Page = () => {
  const [currentlyDeletingChat, setCurrentlyDeletingChat] = useState<
    string | null
  >(null);
  const [currentlySyncingChat, setCurrentlySyncingChat] = useState<
    string | null
  >(null);

  const utils = trpc.useUtils();

  const { data: chats, isLoading } = trpc.chats.getUserChats.useQuery();

  const { mutate: deleteChat } = trpc.chats.deleteChat.useMutation({
    onSuccess: () => {
      utils.chats.getUserChats.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingChat(id);
    },
    onSettled() {
      setCurrentlyDeletingChat(null);
    },
  });

  const { mutate: syncChat } = trpc.chats.syncChat.useMutation({
    onSuccess: () => {
      utils.chats.getUserChats.invalidate();
    },
    onMutate({ id }) {
      setCurrentlySyncingChat(id);
    },
    onSettled() {
      setCurrentlySyncingChat(null);
    },
  });

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-primary-foreground pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl ">My chats</h1>

        <CreateChatButton />
      </div>

      {chats && chats?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y md:grid-cols-2 lg:grid-cols-3">
          {chats
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((chat) => (
              <li
                key={chat.id}
                className="col-span-1 divide-y divide-secondary rounded-lg bg-primary-foreground shadow transition hover:shadow-lg border-2 border-secondary"
              >
                <Link
                  href={`/dashboard/chats/${chat.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium">
                          {chat.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    {format(new Date(chat.createdAt), "MMM yyyy")}
                  </div>

                  <Button
                    onClick={() => syncChat({ id: chat.id })}
                    size="sm"
                    className="w-full"
                    variant="default"
                  >
                    {currentlySyncingChat === chat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FolderSync className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    onClick={() => deleteChat({ id: chat.id })}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {currentlyDeletingChat === chat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} baseColor="#070708" />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s create your first chat.</p>
        </div>
      )}
    </main>
  );
};

export default Page;
