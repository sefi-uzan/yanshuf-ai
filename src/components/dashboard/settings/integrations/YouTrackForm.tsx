"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

import { trpc } from "@/app/_trpc/client";
import CredentialsPopover from "./CredentialsPopover";

const YouTrackForm = () => {
  const credentials = trpc.youtrack.getUserYoutrackCredentials.useQuery();

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

        <CardFooter className="flex flex-col items-start md:flex-row md:justify-between md:space-x-0">
          <CredentialsPopover
            credentials={credentials.data!}
            isLoading={credentials.isLoading}
          />
        </CardFooter>
      </Card>
    </main>
  );
};

export default YouTrackForm;
