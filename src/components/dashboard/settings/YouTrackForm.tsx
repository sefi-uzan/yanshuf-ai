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

  const getProjects = async () => {
    await refetchProjects();
  };

  return (
    <MaxWidthWrapper className="max-w-5xl">
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
        </CardHeader>

        <CardContent className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <IssuesTable />
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default YouTrackForm;
