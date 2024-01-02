import { db } from "@/db";
import { openai } from "@/lib/openai";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { NextRequest } from "next/server";

import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getServerSession } from "next-auth";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const session = await getServerSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const { user } = session;
  const { id: userId } = user;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { chatId, message } = SendMessageValidator.parse(body);

  const chat = await db.chat.findFirst({
    where: {
      id: chatId,
      userId,
    },
  });

  if (!chat) return new Response("Not found", { status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      chatId,
    },
  });

  // 1: vectorize message
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: chat.id,
  });

  const results = await vectorStore.similaritySearch(message, 4);

  const prevMessages = await db.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 6,
  });

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? ("user" as const) : ("assistant" as const),
    content: msg.text,
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
                  You are an expert QA Engineer and you will help with QA tasks, in the context you have access to project tickets, all tickets contain an id, summary, description.
                  You will be asked questions about these tickets
        
  \n----------------\n
  
  PREVIOUS CONVERSATION:
  ${formattedPrevMessages.map((message) => {
    if (message.role === "user") return `User: ${message.content}\n`;
    return `Assistant: ${message.content}\n`;
  })}
  
  \n----------------\n
  
  CONTEXT:
  ${results.map((r) => r.pageContent).join("\n\n")}
  
  USER INPUT: ${message}`,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      await db.message.create({
        data: {
          text: completion,
          isUserMessage: false,
          chatId,
          userId,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
};
