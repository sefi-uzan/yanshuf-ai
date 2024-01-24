import { AppRouter } from "@/app/api/trpc/trpc";
import { inferRouterOutputs } from "@trpc/server";

type Credentials = RouterOutput["youtrack"]["getUserYoutrackCredentials"];

type RouterOutput = inferRouterOutputs<AppRouter>;

type Projects = {
  shortName: string;
  id: string;
  $type: string;
};

interface Issue {
  $type: string;
  id: string;
  name: string;

  updated: number;
  created: number;

  summary: string;
  description: string;

  customFields: CustomField[];
}

interface CustomField {
  $type: string;
  id: string;
  name: string;

  value: CustomFieldValue;
}

interface CustomFieldValue {
  $type: string;
  id: string;
  name: string;
}

type User = {
  user: {
    username: string;
    name: string;
    email: string;
    image: string;
    youtrackActiveProject: string | null;
  };
};

type Messages = RouterOutput["messages"]["getMessages"]["messages"];

type OmitText = Omit<Messages[number], "text">;

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;
