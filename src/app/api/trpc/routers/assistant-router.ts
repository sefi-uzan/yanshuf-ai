import { privateProcedure, router } from "@/app/api/trpc/trpc";
import { db } from "@/db";
import { openai } from "@/lib/openai";
import { Assistant } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

export const assistantRouter = router({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        instructions: z.string().optional(),
        fileId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { name, description, instructions, fileId } = input;
      const modifiedInstructions = `Please reply only with the json object requested from you do not wrap it in anything, no markdown, no html, just an array of objects, I will be treating it as such, make your reply clear and consice and ask clarification questions if you need to, also follow the attached user instructions: ${instructions}`;
      let assistant = await openai.beta.assistants.create({
        instructions: modifiedInstructions,
        name,
        description,
        tools: [{ type: "retrieval" }],
        model: "gpt-4-0125-preview",
      });

      if (fileId) {
        assistant = await openai.beta.assistants.update(assistant.id, {
          file_ids: [fileId],
        });
      }

      if (!assistant)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating assistant",
        });

      const dbAssistant = await db.assistant.create({
        data: {
          id: assistant.id,
          name: assistant.name || nanoid(6),
          description: assistant.description,
          instructions: instructions,
          fileId: assistant.file_ids[0],
          userId: userId,
        },
      });

      return dbAssistant;
    }),

  list: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const dbAssistants = await db.assistant.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return dbAssistants;
  }),
  retrieve: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { userId } = ctx;

      const dbAssistant = await db.assistant.findFirst({
        where: {
          id,
          userId,
        },
      });

      return dbAssistant;
    }),
  modify: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        instructions: z.string().optional(),
        fileId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, description, instructions, fileId } = input;
      const { userId } = ctx;

      let openaiAssistant = await openai.beta.assistants.update(id, {
        name,
        description,
        instructions,
      });

      if (fileId) {
        openaiAssistant = await openai.beta.assistants.update(id, {
          file_ids: [fileId],
        });
      }

      const dbAssistant = await db.assistant.update({
        where: {
          id: openaiAssistant.id,
          userId,
        },
        data: {
          name: openaiAssistant.name || undefined,
          description: openaiAssistant.description,
          instructions: openaiAssistant.instructions,
          fileId: openaiAssistant.file_ids[0],
        },
      });

      return dbAssistant;
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { userId } = ctx;

      const openaiAssistant = await openai.beta.assistants.del(id);

      const dbAssistant = await db.assistant.delete({
        where: {
          id: openaiAssistant.id,
          userId,
        },
      });

      if (dbAssistant.fileId) {
        const openaiFile = await openai.files.del(dbAssistant.fileId);

        await db.file.delete({
          where: {
            id: openaiFile.id,
          },
        });
      }

      return dbAssistant;
    }),
});
