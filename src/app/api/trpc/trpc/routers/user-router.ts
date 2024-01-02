import { publicProcedure, router } from "@/app/api/trpc/trpc/trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";

export const userRouter = router({
  authCallback: publicProcedure.query(async () => {
    const session = await getServerSession();

    if (!session?.user.id || !session.user.email)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: session.user.id,
          email: session.user.email,
        },
      });
    }
  }),
});
