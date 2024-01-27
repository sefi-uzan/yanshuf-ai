import { authRouter } from "@/app/api/trpc/routers/auth-router";
import { chatsRouter } from "./routers/chats-router";
import { messagesRouter } from "./routers/messages-router";
import { userRouter } from "./routers/user-router";
import { router } from "./trpc";
import { fileRouter } from "./routers/file-router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  chats: chatsRouter,
  messages: messagesRouter,
  file: fileRouter,
});

export type AppRouter = typeof appRouter;
