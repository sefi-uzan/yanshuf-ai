"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/lib/utils";
import { use, useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { set } from "date-fns";

export function SelectAssistant() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();

  const { data: assistants } = trpc.assistant.list.useQuery();
  const { setAssistantId, assistantId } = useContext(ChatContext);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={!!assistantId}
          className="w-[200px] justify-between"
        >
          {value
            ? assistants?.find((assistant) => assistant.id === value)?.name
            : assistantId
            ? assistants?.find((assistant) => assistant.id === assistantId)
                ?.name
            : "Select an assistant"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search assistant..." className="h-9" />
          <CommandEmpty>No assistant found.</CommandEmpty>
          <CommandGroup>
            {assistants?.map((assistant) => (
              <CommandItem
                key={assistant.id}
                value={assistant.id}
                onSelect={() => {
                  setValue(assistant.id === value ? undefined : assistant.id);
                  setAssistantId(assistant.id);
                  setOpen(false);
                }}
              >
                {assistant.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === assistant.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
