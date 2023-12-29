"use client";

import { Loader2 } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";

type YoutrackDetails = {
  token: string;
  baseUrl: string;
};
const YouTrackForm = () => {
  const [youtrackDetails, setYoutrackDetails] = useState<YoutrackDetails>({
    token: "",
    baseUrl: "YouTrack base URL...",
  });

  const { data: credentials, isLoading: isTokenLoading } =
    trpc.youtrack.getUserYoutrackCredentials.useQuery();

  const {
    data: testCredentialsData,
    isRefetching: isTestCredentialsLoading,
    isFetched,
    refetch,
  } = trpc.youtrack.testYoutrackCredentials.useQuery(undefined, {
    enabled: false,
    onSuccess: (testCredentialsData) => {
      if (testCredentialsData.status === 200) {
        toast({
          title: `Credentials test completed with a status of: ${testCredentialsData?.status}`,
          description: `${testCredentialsData?.message}`,
          variant: "default",
        });
      } else {
        toast({
          title: `Credentials test completed with a status of: ${testCredentialsData?.status}`,
          description: `${testCredentialsData?.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const { toast } = useToast();

  const {
    mutate: addUserYoutrackDetails,
    isLoading: isUserYoutrackDetailsLoading,
  } = trpc.youtrack.addUserYoutrackDetails.useMutation({
    onSuccess: ({ youtrackDetailsUpdated }) => {
      if (youtrackDetailsUpdated)
        toast({
          title: "Token added successfully",
          description:
            "Click on Test Token if you want to make sure its working",
          variant: "default",
        });
      if (!youtrackDetailsUpdated) {
        toast({
          title: "There was a problem...",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      }
    },
  });

  const testToken = async () => {
    await refetch();
  };

  useEffect(() => {
    setYoutrackDetails((youtrackDetails) => ({
      ...youtrackDetails,
      baseUrl: credentials?.baseUrl || "YouTrack Base URL...",
    }));
  }, [credentials?.baseUrl]);

  return (
    <MaxWidthWrapper className="max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>YouTrack integration</CardTitle>
          <CardDescription>
            {credentials?.token
              ? "You have an active YouTrack Token"
              : "You do not have an active YouTrack token"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                {isTokenLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Modify Credentials"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  addUserYoutrackDetails({
                    token: youtrackDetails.token,
                    baseUrl: youtrackDetails.baseUrl,
                  });
                }}
              >
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="baseUrl" className="col-span-1">
                    Base Url
                  </Label>
                  <Input
                    id="baseUrl"
                    value={youtrackDetails.baseUrl}
                    className="col-span-2 h-8"
                    type="text"
                    onChange={(e) => {
                      e.preventDefault();
                      setYoutrackDetails((youtrackDetails) => ({
                        ...youtrackDetails,
                        baseUrl: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="token" className="col-span-1">
                    Token
                  </Label>
                  <Input
                    id="token"
                    value={youtrackDetails.token}
                    className="col-span-2 h-8"
                    type="password"
                    onChange={(e) => {
                      e.preventDefault();
                      setYoutrackDetails((youtrackDetails) => ({
                        ...youtrackDetails,
                        token: e.target.value,
                      }));
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="col-span-2"
                >
                  {isUserYoutrackDetailsLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            className="bg-lime-500"
            disabled={!credentials?.token}
            onClick={() => testToken()}
          >
            {isTokenLoading || isTestCredentialsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Test Token"
            )}
          </Button>
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default YouTrackForm;
