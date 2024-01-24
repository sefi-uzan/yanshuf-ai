"use client";
import { trpc } from "@/app/_trpc/client";
import { Button, buttonVariants } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { intlFormat } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().optional(),
});

const IssuesTable = () => {
  const { toast } = useToast();

  const { data: issues, mutate } =
    trpc.youtrack.searchProjectIssues.useMutation({
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Issues fetched successfully",
          variant: "default",
        });
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row justify-between space-x-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder="Search for issues..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Issue ID</TableHead>
            <TableHead>Priorty</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Stage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues?.issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">{issue.id}</TableCell>
              <TableCell>
                {
                  issue.customFields.filter(
                    (field) => field.name === "Priority"
                  )[0].value.name
                }
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mr-2"
                  )}
                >
                  {
                    issue.customFields.filter(
                      (field) => field.name === "Type"
                    )[0].value.name
                  }
                </span>
                {issue.summary}
              </TableCell>
              <TableCell>{intlFormat(issue.created)}</TableCell>
              <TableCell>{intlFormat(issue.updated)}</TableCell>
              <TableCell>
                {
                  issue.customFields.filter(
                    (field) => field.name === "Stage"
                  )[0].value.name
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default IssuesTable;
