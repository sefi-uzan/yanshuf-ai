import { publicProcedure, router } from "@/app/api/trpc/trpc";
import { getAuthSession } from "@/config/auth-options";
import { db } from "@/db";
import { User } from "@/types/types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = router({
  getUserInfo: publicProcedure.query(async (): Promise<User> => {
    const session = await getAuthSession();

    if (!session?.user.id || !session.user.email)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!dbUser) {
      throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
    }

    return {
      user: {
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      },
    };
  }),
  updateUserInfo: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        username: z.string().optional(),
        email: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await getAuthSession();

      if (!session?.user.id || !session.user.email)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const dbUser = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          name: input.name,
          email: input.email,
          image: input.image,
        },
      });

      if (!dbUser) {
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });
      }
    }),
});
