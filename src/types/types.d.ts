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

type DBFile = {
  id: string;
  name: string;
  size: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
type StrippedMessage = {
  role: "user" | "assistant";
  content: MessageContentText.Text;
};
type Messages = RouterOutput["message"]["list"];
type Assistant = RouterOutput["assistant"]["create"];

type OmitText = Omit<Messages[number], "text">;

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;
