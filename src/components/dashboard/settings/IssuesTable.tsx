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
import { Issues } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type IssuesTable = {
  issues?: Issues[];
  activeProject: string;
};

const IssuesTable = ({ issues, activeProject }: IssuesTable) => {
  return (
    <>
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
          {issues?.map((issue) => (
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
