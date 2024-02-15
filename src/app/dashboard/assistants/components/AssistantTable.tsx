"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import TableRowContextMenu from "./TableRowContextMenu";
import CreateAssistantButton from "./CreateAssistantButton";
import { Ghost, Loader2 } from "lucide-react";
import { ScrollArea } from "@/app/components/ui/scroll-area";

export const settingsNavItems = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    name: "Account",
    href: "/dashboard/settings/account",
  },
];
const AssistantTable = () => {
  const { data, isLoading } = trpc.assistant.list.useQuery();

  return (
    <ScrollArea className="h-[calc(100vh-18rem)]">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin justify-center mx-auto" />
      ) : (
        <>
          {data?.length != 0 ? (
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead className="w-1/8">Name</TableHead>
                  <TableHead className="w-1/2">Instructions</TableHead>
                  <TableHead className="w-1/8">ID</TableHead>
                  <TableHead className="w-1/5">Date Created</TableHead>
                  <TableHead className="w-1/16"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((assistant) => (
                  <TableRow key={assistant.id}>
                    <TableCell>{assistant.name}</TableCell>
                    <TableCell>{assistant.instructions}</TableCell>
                    <TableCell>{assistant.id}</TableCell>
                    <TableCell>
                      {new Date(assistant.createdAt).toLocaleTimeString()}
                      {" - "}
                      {new Date(assistant.createdAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      <TableRowContextMenu assistant={assistant} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto space-y-2">
              <Ghost className="h-4 w-4" />
              <p>Its pretty empty here</p>
              <p>create an assistant to get started</p>
              <CreateAssistantButton />
            </div>
          )}
        </>
      )}
    </ScrollArea>
  );
};

export default AssistantTable;
