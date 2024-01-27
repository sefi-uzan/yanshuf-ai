import { AppRouter } from "@/app/api/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

type User = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

type Messages = RouterOutput["messages"]["getMessages"]["messages"];

type OmitText = Omit<Messages[number], "text">;

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;
