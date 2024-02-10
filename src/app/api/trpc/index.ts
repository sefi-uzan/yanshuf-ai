import { authRouter } from "@/app/api/trpc/routers/auth-router";
import { userRouter } from "./routers/user-router";
import { router } from "./trpc";
import { assistantRouter } from "./routers/assistant-router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  assistant: assistantRouter,
});

export type AppRouter = typeof appRouter;
