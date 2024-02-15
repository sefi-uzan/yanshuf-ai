import { privateProcedure, router } from "@/app/api/trpc/trpc";
import { db } from "@/db";
import { openai } from "@/lib/openai";
import { sleep } from "@/lib/utils";
import { z } from "zod";

export const threadRouter = router({
  createAndRun: privateProcedure
    .input(
      z.object({
        assistantId: z.string(),
        content: z.string(),
        fileId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;


      const realFileId = () => {
        if (input.fileId) {
          return [input.fileId];
        } else {
          return [];
        }
      };

      const openaiThread = await openai.beta.threads.create();
      console.log("Thread created");

      const openaiMessage = await openai.beta.threads.messages.create(
        openaiThread.id,
        {
          role: "user",
          content: input.content,
          file_ids: realFileId(),
        }
      );

      console.log("message created" + openaiMessage.thread_id);

      const openaiRun = await openai.beta.threads.runs.create(openaiThread.id, {
        assistant_id: input.assistantId,
      });

      console.log("run created");

      const thread = await db.thread.create({
        data: {
          id: openaiThread.id,
          userId,
          assistantId: input.assistantId,
          runId: openaiRun.id,
          name: input.content.slice(0, 16),
        },
      });

      console.log("db thread created");

      const message = await db.message.create({
        data: {
          id: openaiMessage.id,
          content: input.content,
          threadId: openaiMessage.thread_id,
          role: "user",
        },
      });

      console.log("db message created");

      return thread;
    }),
  runThread: privateProcedure
    .input(
      z.object({
        assistantId: z.string(),
        content: z.string(),
        fileId: z.string().optional(),
        threadId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const realFileId = () => {
        if (input.fileId) {
          return [input.fileId];
        } else {
          return [];
        }
      };

      const openaiMessage = await openai.beta.threads.messages.create(
        input.threadId,
        {
          role: "user",
          content: input.content,
          file_ids: realFileId(),
        }
      );

      console.log("message created");

      const openaiRun = await openai.beta.threads.runs.create(input.threadId, {
        assistant_id: input.assistantId,
      });

      console.log("run created");

      const message = await db.message.create({
        data: {
          id: openaiMessage.id,
          content: input.content,
          threadId: input.threadId,
          role: "user",
        },
      });

      console.log("db message created");

      let status = "queued";

      while (status === "queued" || status === "in_progress") {
        const run = await openai.beta.threads.runs.retrieve(
          input.threadId,
          openaiRun.id
        );
        status = run.status;
        await sleep(3000);
      }

      return message;
    }),
  list: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const threads = await db.thread.findMany({
      where: {
        userId,
      },
    });

    return threads;
  }),
  getThread: privateProcedure
    .input(z.object({ threadId: z.string().nullable() }))
    .mutation(({ input }) => {
      const { threadId } = input;

      if (!threadId) {
        return undefined;
      }
      const thread = db.thread.findFirst({
        where: {
          id: threadId,
        },
      });

      return thread;
    }),
  getRun: privateProcedure
    .input(
      z.object({
        runId: z.string().nullable(),
        threadId: z.string().nullable(),
      })
    )
    .query(async ({ input }) => {
      const { threadId, runId } = input;
      if (!threadId || runId == "" || !runId) {
        return undefined;
      }
      const run = await openai.beta.threads.runs.retrieve(threadId, runId);

      return run;
    }),
});
