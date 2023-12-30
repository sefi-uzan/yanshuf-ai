import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { Credentials } from "@/types/types";

type YoutrackCredentials = {
  token: string;
  baseUrl: string;
};

type CredentialsPopoverProps = {
  credentials: Credentials;
  isLoading: boolean;
};

const CredentialsPopover = ({
  credentials,
  isLoading,
}: CredentialsPopoverProps) => {
  const { toast } = useToast();

  const [youtrackDetails, setYoutrackCredentials] =
    useState<YoutrackCredentials>({
      token: "",
      baseUrl: "YouTrack base URL...",
    });

  const {
    mutate: addUserYoutrackDetails,
    isLoading: isUserYoutrackDetailsLoading,
  } = trpc.youtrack.addUserYoutrackCredentials.useMutation({
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

  useEffect(() => {
    setYoutrackCredentials((youtrackCredentials) => ({
      ...youtrackCredentials,
      baseUrl: credentials?.baseUrl || "YouTrack Base URL...",
    }));
  }, [credentials?.baseUrl]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {isLoading ? (
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
                setYoutrackCredentials((youtrackDetails) => ({
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
                setYoutrackCredentials((youtrackDetails) => ({
                  ...youtrackDetails,
                  token: e.target.value,
                }));
              }}
            />
          </div>
          <Button type="submit" variant="secondary" className="col-span-2">
            {isUserYoutrackDetailsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CredentialsPopover;
