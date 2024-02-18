"use client";
import { trpc } from "@/app/_trpc/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Pencil, Settings2, Trash2 } from "lucide-react";
import EditSheet from "./EditSheet";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Assistant } from "@/types/types";
import { useState } from "react";

type TableRowContextMenuProps = {
  assistant: Assistant;
};

const TableRowContextMenu = ({ assistant }: TableRowContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();
  const { mutate } = trpc.assistant.delete.useMutation();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Settings2 className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <SheetTrigger className="flex items-center flex-row">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </SheetTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              mutate(
                { id: assistant.id },
                {
                  onSuccess: () => {
                    utils.assistant.list.invalidate();
                  },
                }
              )
            }
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditSheet assistant={assistant} setOpen={setOpen} />
    </Sheet>
  );
};

export default TableRowContextMenu;
