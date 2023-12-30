import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { issueNameCreator } from "@/lib/validators/IssueNameCreator";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const IssuesTable = () => {
  const { toast } = useToast();

  const [activeProject, setActiveProject] = useState<string>("0-1");

  const {
    data: issues,
    isRefetching: fetchingUserIssues,
    refetch: refetchIssues,
  } = trpc.youtrack.getUserIssues.useQuery(
    { projectId: activeProject },
    {
      enabled: false,
      onSuccess: () => {
        toast({
          title: `Issues fetched successfully`,
          variant: "default",
        });
      },
    }
  );

  const getIssues = async () => {
    await refetchIssues();
  };

  return (
    <>
      <Button
        variant="outline"
        className="bg-lime-500"
        onClick={() => getIssues()}
      >
        {fetchingUserIssues ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Get Issues"
        )}
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues?.issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                {issueNameCreator(activeProject, issue.id)}
              </TableCell>
              <TableCell>{issue.type}</TableCell>
              <TableCell>{issue.summary}</TableCell>
              <TableCell className="text-right">{issue.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default IssuesTable;
