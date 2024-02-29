import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/config/auth-options";

import OpenAI from "openai";
import { db } from "@/db";
import { DBFile } from "@/types/types";

export const POST = async (req: NextRequest) => {
  const openai = new OpenAI();

  const body = await req.formData();
  const file: File = body.get("file") as File;
  const url: string = body.get("fileUrl") as string;

  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });

  const { user } = session;
  const { id: userId } = user;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const uploadedFile = await openai.files.create({
      file: file,
      purpose: "assistants",
    });

    const dbFile: DBFile = await db.file.create({
      data: {
        id: uploadedFile.id,
        name: uploadedFile.filename,
        url: url,
        size: uploadedFile.bytes,
      },
    });

    return NextResponse.json(dbFile);
  } catch (error) {
    return NextResponse.error();
  }
};
