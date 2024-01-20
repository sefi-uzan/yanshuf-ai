"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { trpc } from "@/app/_trpc/client";
import CredentialsPopover from "./CredentialsPopover";
import ProjectSelection from "./ProjectSelection";

const YouTrackForm = () => {
  const credentials = trpc.youtrack.getUserYoutrackCredentials.useQuery();
  const { data } = trpc.youtrack.getUserProjects.useQuery();

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>YouTrack integration</CardTitle>
          <CardDescription>
            {credentials.data?.token
              ? "You have an active YouTrack Token"
              : "You do not have an active YouTrack token"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col md:flex-row md:justify-between space-y-4 items-center justify-center">
          <CredentialsPopover
            credentials={credentials.data!}
            isLoading={credentials.isLoading}
          />
          <ProjectSelection projects={data?.projects} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default YouTrackForm;
