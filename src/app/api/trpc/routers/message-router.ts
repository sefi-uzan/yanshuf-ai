import { privateProcedure, router } from "@/app/api/trpc/trpc";
import { db } from "@/db";
import { openai } from "@/lib/openai";
import { z } from "zod";
import { remark } from "remark";
import html from "remark-html";

export const messageRouter = router({
  create: privateProcedure
    .input(
      z.object({
        threadId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { threadId, content } = input;

      const message = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content,
      });

      const dbMessage = await db.message.create({
        data: {
          id: message.id.toLowerCase(),
          content: input.content,
          threadId: message.thread_id,
          role: "user",
        },
      });

      return dbMessage;
    }),
  list: privateProcedure
    .input(z.object({ threadId: z.string().nullable() }))
    .query(async ({ input }) => {
      const { threadId } = input;

      if (!threadId) {
        return undefined;
      }

      const messages = await openai.beta.threads.messages.list(threadId);

      const filteredMessages = messages.data.map((message) => {
        const role = message.role;
        const content: string[] = [];
        message.content.map(async (content1) => {
          if (content1.type === "text") {
            const processedContent = await remark()
              .use(html)
              .process(content1.text.value);
            const contentHtml = processedContent.toString();
            content.push(contentHtml);
          }
        });
        return {
          role,
          content,
        };
      });
      return filteredMessages;
    }),
});
