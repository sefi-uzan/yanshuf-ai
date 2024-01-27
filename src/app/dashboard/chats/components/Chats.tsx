"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/app/components/ui/button";
import EmptyState from "@/app/components/ui/empty-state";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { format } from "date-fns";
import { Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import CreateChatButton from "./CreateChatButton";

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Chats = ({ subscriptionPlan }: PageProps) => {
  const [currentlyDeletingChat, setCurrentlyDeletingChat] = useState<
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

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="space-y-2 flex flex-col md:flex-row justify-between md:items-end">
        <div className="flex flex-col justify-start">
          <h2 className="text-2xl font-bold tracking-tight">Chats</h2>
          <p className="text-muted-foreground">
            This is where you manage all your chats
          </p>
        </div>
        <CreateChatButton isSubscribed={subscriptionPlan.isSubscribed} />
      </div>

      <div role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>

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

                <div className="px-6 mt-4 flex flex-row justify-between place-items-center py-2 gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    {format(new Date(chat.createdAt), "MMM yyyy")}
                  </div>

                  <Button
                    onClick={() => deleteChat({ id: chat.id })}
                    size="sm"
                    className="px-4"
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
        <EmptyState />
      )}
    </main>
  );
};

export default Chats;
