import { privateProcedure, router } from "@/app/api/trpc/trpc/trpc";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { db } from "@/db";
import { Youtrack } from "@/lib/youtrack";
import { Pinecone } from "@pinecone-database/pinecone";
import { TRPCError } from "@trpc/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
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

  syncChat: privateProcedure
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

      const pinecone = new Pinecone();
      const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      const { data } = await youtrack.getProjcetIssues("YA");
      const stringifiedData = data.map((issue) => {
        return JSON.stringify(issue);
      });

      try {
        const pine = await PineconeStore.fromTexts(
          stringifiedData,
          data.keys(),
          embeddings,
          {
            pineconeIndex,
            namespace: chat.id,
          }
        );
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
