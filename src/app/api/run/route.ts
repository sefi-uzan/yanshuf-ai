import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/config/auth-options";

import OpenAI from "openai";
import { db } from "@/db";
import { DBFile } from "@/types/types";

export const POST = async (req: NextRequest) => {
  const openai = new OpenAI();

  const body = await req.json();

  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const { user } = session;
  const { id: userId } = user;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const run = await openai.beta.threads.runs.retrieve(
      body.threadId,
      body.runId
    );

    return run;
  } catch (error) {
    return NextResponse.error();
  }
};
