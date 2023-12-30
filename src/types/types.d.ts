import { AppRouter } from "@/app/api/trpc/trpc";
import { inferRouterOutputs } from "@trpc/server";

type Credentials = RouterOutput["youtrack"]["getUserYoutrackCredentials"];

type RouterOutput = inferRouterOutputs<AppRouter>;

type Projects = {
  shortName: string;
  id: string;
  $type: string;
};

type Issues = {
  type: string;
  id: string;
  description: string;
  summary: string;
};

type Messages = RouterOutput["messages"]["getMessages"]["messages"];

type OmitText = Omit<Messages[number], "text">;

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;
