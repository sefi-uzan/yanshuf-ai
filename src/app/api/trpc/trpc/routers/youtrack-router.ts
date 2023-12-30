import { privateProcedure, router } from "@/app/api/trpc/trpc/trpc";
import { db } from "@/db";
import { Youtrack } from "@/lib/youtrack";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const youtrackRouter = router({
  getUserYoutrackCredentials: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

    if (dbUser?.youtrackToken === "")
      return { baseUrl: dbUser.youtrackBaseUrl, token: false };
    else return { baseUrl: dbUser.youtrackBaseUrl, token: true };
  }),

  getUserProjects: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser || dbUser.youtrackToken === "")
      throw new TRPCError({ code: "UNAUTHORIZED" });

    const youtrack = new Youtrack(dbUser.youtrackBaseUrl, dbUser.youtrackToken);
    const response = await youtrack.getProjcets();
    return { projects: response.data };
  }),

  getUserIssues: privateProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;

      const dbUser = await db.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!dbUser || dbUser.youtrackToken === "")
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const youtrack = new Youtrack(
        dbUser.youtrackBaseUrl,
        dbUser.youtrackToken
      );
      const response = await youtrack.getProjcetIssues(input.projectId);
      return { issues: response.data };
    }),

  addUserYoutrackCredentials: privateProcedure
    .input(
      z.object({
        token: z.string(),
        baseUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId: id } = ctx;
      const { token: youtrackToken, baseUrl: youtrackBaseUrl } = input;

      if (!id) throw new TRPCError({ code: "UNAUTHORIZED" });

      const updateUser = await db.user.update({
        where: {
          id,
        },
        data: {
          youtrackToken,
          youtrackBaseUrl,
        },
      });

      if (!updateUser) throw new TRPCError({ code: "UNAUTHORIZED" });

      if (updateUser.youtrackToken && updateUser.youtrackBaseUrl)
        return { youtrackDetailsUpdated: true };
      else return { youtrackDetailsUpdated: false };
    }),
});
