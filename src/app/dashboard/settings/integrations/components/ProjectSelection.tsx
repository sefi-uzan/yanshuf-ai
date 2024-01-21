"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { Projects } from "@/types/types";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/app/components/ui/use-toast";

type ProjectSelectionProps = {
  projects?: Projects[];
};

const ProjectSelection = (projects: ProjectSelectionProps) => {
  const { toast } = useToast();
  const { data } = trpc.youtrack.getUserActiveProject.useQuery();
  const { mutate } = trpc.youtrack.setUserActiveProject.useMutation({
    onSuccess: () => {
      return toast({
        title: "Active project updated",
        description: "Your active project has updated successfully",
        variant: "default",
      });
    },
    onError: (err) => {
      return toast({
        title: "Active project failed to update",
        description: `${err.message}`,
        variant: "destructive",
      });
    },
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.activeProject || "");

  return (
    <div className="space-y-4 md:space-y-0 flex flex-col md:flex-row space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? projects.projects?.find(
                  (project) => project.shortName == value.toUpperCase()
                )?.shortName
              : "Select project..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search project..." className="h-9" />
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup>
              {projects.projects?.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.shortName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {project.shortName}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === project.shortName ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => mutate({ project: value.toLocaleUpperCase() })}
        variant="secondary"
        className=""
      >
        Set as active project
      </Button>
    </div>
  );
};

export default ProjectSelection;
