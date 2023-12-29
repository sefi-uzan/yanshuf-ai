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
import { useState } from "react";

const YouTrackForm = () => {
  const [token, setToken] = useState<string>("");
  const { data, isLoading } = trpc.getUserYoutrackToken.useQuery();

  const { toast } = useToast();

  const {
    mutate: addUserYoutrackToken,
    isLoading: addUserYoutrackTokenIsLoading,
  } = trpc.addUserYoutrackToken.useMutation({
    onSuccess: ({ token }) => {
      if (token)
        toast({
          title: "Token added successfully",
          description:
            "Click on Test Token if you want to make sure its working",
          variant: "default",
        });
      if (!token) {
        toast({
          title: "There was a problem...",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <MaxWidthWrapper className="max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>YouTrack token</CardTitle>
          <CardDescription>
            {data?.token
              ? "You have an active YouTrack Token"
              : "You do not have an active YouTrack token"}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                {isLoading ? (
                  <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                ) : null}
                {data?.token ? "Modify Token" : "Add Token"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addUserYoutrackToken({ token });
                }}
              >
                <div className="grid grid-cols-6 items-center gap-2">
                  <Label htmlFor="token" className="col-span-1">
                    Token
                  </Label>
                  <Input
                    id="token"
                    value={token}
                    className="col-span-3 h-8"
                    type="password"
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="col-span-2"
                  >
                    {addUserYoutrackTokenIsLoading ? (
                      <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            className="bg-lime-500"
            disabled={!data?.token}
          >
            {isLoading ? (
              <Loader2 className="mr-4 h-4 w-4 animate-spin" />
            ) : null}
            Test Token
          </Button>
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default YouTrackForm;
