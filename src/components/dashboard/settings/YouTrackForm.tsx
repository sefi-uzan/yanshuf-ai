"use client";

import { Loader2 } from "lucide-react";
import MaxWidthWrapper from "../../providers/MaxWidthWrapper";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import { trpc } from "@/app/_trpc/client";
import { useToast } from "../../ui/use-toast";
import { useState } from "react";
import CredentialsPopover from "./CredentialsPopover";
import IssuesTable from "./IssuesTable";

const YouTrackForm = () => {
  const { toast } = useToast();

  const credentials = trpc.youtrack.getUserYoutrackCredentials.useQuery();

  const {
    data: projects,
    isRefetching: fetchingUserProjects,
    refetch: refetchProjects,
  } = trpc.youtrack.getUserProjects.useQuery(undefined, {
    enabled: false,
    onSuccess: () => {
      toast({
        title: `Projects fetched successfully`,
        variant: "default",
      });
    },
  });

  const [activeProject, setActiveProject] = useState<string>("0-1");

  const issues = trpc.youtrack.getUserIssues.useQuery(
    { projectId: activeProject },
    {
      enabled: false,
      onSuccess: () => {
        toast({
          title: `Issues fetched successfully`,
          variant: "default",
        });
      },
      onError(err) {
        toast({
          title: "failed fetching issues",
          description: `${err.message}`,
          variant: "destructive",
        });
      },
    }
  );

  const getIssues = async () => {
    await issues.refetch();
  };

  const getProjects = async () => {
    await refetchProjects();
  };

  return (
    <main className="mt-2 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>YouTrack integration</CardTitle>
          <CardDescription>
            {credentials.data?.token
              ? "You have an active YouTrack Token"
              : "You do not have an active YouTrack token"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <CredentialsPopover
            credentials={credentials.data!}
            isLoading={credentials.isLoading}
          />
          <Button
            variant="outline"
            className="bg-lime-500"
            disabled={!credentials.data?.token}
            onClick={() => getProjects()}
          >
            {credentials.isLoading || fetchingUserProjects ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Get Projects"
            )}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>YouTrack Projects</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <ul>
            {projects?.projects.map((project) => {
              return (
                <li key={project.id}>
                  {project.shortName} {project.id}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>YouTrack Project Issues</CardTitle>
          <Button
            variant="outline"
            className="bg-lime-500"
            onClick={() => getIssues()}
          >
            {issues.isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Get Issues"
            )}
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <IssuesTable
            issues={issues.data?.issues}
            activeProject={activeProject}
          />
        </CardContent>
      </Card>
    </main>
  );
};

export default YouTrackForm;
