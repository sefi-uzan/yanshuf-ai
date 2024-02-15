import { privateProcedure, router } from "@/app/api/trpc/trpc";
import { db } from "@/db";
import { z } from "zod";

export const fileRouter = router({
  getFile: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const dbFile = await db.file.findFirst({
        where: {
          id: input.id,
        },
      });

      return dbFile;
    }),
});
