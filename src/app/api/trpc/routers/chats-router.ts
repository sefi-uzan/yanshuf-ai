import { privateProcedure, router } from "@/app/api/trpc/trpc";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const chatsRouter = router({
  getUserChats: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.chat.findMany({
      where: {
        userId,
      },
    });
  }),

  getChat: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const chat = await db.chat.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!chat) throw new TRPCError({ code: "NOT_FOUND" });

      return chat;
    }),

  createChat: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const existingChat = await db.chat.findFirst({
        where: {
          name: input.name,
          userId,
        },
      });

      if (existingChat) throw new TRPCError({ code: "CONFLICT" });

      const chat = await db.chat.create({
        data: {
          name: input.name,
          userId,
        },
      });

      if (!chat) throw new TRPCError({ code: "NOT_FOUND" });

      return chat;
    }),

  deleteChat: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const chat = await db.chat.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!chat) throw new TRPCError({ code: "NOT_FOUND" });

      await db.message.deleteMany({
        where: {
          chatId: chat.id,
        },
      });

      await db.chat.delete({
        where: {
          id: input.id,
        },
      });

      return chat;
    }),
});
