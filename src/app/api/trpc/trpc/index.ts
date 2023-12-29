import { authRouter } from "@/app/api/trpc/trpc/routers/auth-router";
import { chatsRouter } from "./routers/chats-router";
import { userRouter } from "./routers/user-router";
import { youtrackRouter } from "./routers/youtrack-router";
import { router } from "./trpc";
import { messagesRouter } from "./routers/messages-router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  youtrack: youtrackRouter,
  chats: chatsRouter,
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
