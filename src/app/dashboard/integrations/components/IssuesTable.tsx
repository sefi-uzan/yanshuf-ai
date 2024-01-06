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

const IssuesTable = () => {
  const { data } = trpc.youtrack.getUserActiveProject.useQuery();

  const { data: issues } = trpc.youtrack.getUserIssues.useQuery({
    projectId: data?.activeProject || undefined,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Issue ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Summary</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues?.issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="font-medium">{issue.id}</TableCell>
            <TableCell>{issue.type}</TableCell>
            <TableCell>{issue.summary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IssuesTable;
