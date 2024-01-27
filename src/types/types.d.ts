import { AppRouter } from "@/app/api/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

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
