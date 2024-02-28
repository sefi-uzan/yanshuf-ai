import { authRouter } from "@/app/api/trpc/routers/auth-router";
import { facebookRouter } from "./routers/facebook-router";
import { userRouter } from "./routers/user-router";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  facebook: facebookRouter,
});

export type AppRouter = typeof appRouter;
