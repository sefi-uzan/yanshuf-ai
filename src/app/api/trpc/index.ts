import { authRouter } from "@/app/api/trpc/routers/auth-router";
import { userRouter } from "./routers/user-router";
import { router } from "./trpc";
import { assistantRouter } from "./routers/assistant-router";
import { threadRouter } from "./routers/thread-router";
import { messageRouter } from "./routers/message-router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  assistant: assistantRouter,
  thread: threadRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
