import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { Note } from "@prisma/client";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface NoteInput {
  title: string;
  content: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      },
    );
  }

  const note: NoteInput = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a note-taking assistant. Users will provide notes. You will provide follow-up questions that they might want to think about in the future.",
      },
      {
        role: "user",
        content: note.content,
      },
    ],
    temperature: 1,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const categorizedNote: NoteInput = {
    title: note.title,
    content: `${note.content}
    
Follow up: ${response.choices[0].message.content}`,
  };

  const created = await prisma.note.create({
    data: {
      ...categorizedNote,
      ownerId: session.user.id,
    },
  });
  console.log("@@ note: ", created);
  return NextResponse.json(created);
};

export interface GetAllNotesResponse {
  notes: Note[];
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      },
    );
  }

  const notes = await prisma.note.findMany({
    where: {
      ownerId: session.user.id,
    },
  });
  return NextResponse.json<GetAllNotesResponse>({
    notes,
  });
};
