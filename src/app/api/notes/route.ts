import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { Note } from "@prisma/client";

export interface NoteInput {
  title: string;
  content: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const note: NoteInput = await req.json();
  const created = await prisma.note.create({
    data: note,
  });
  console.log("@@ note: ", created);
  return NextResponse.json(created);
};

export interface GetAllNotesResponse {
  notes: Note[];
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const notes = await prisma.note.findMany();
  return NextResponse.json<GetAllNotesResponse>({
    notes,
  });
};
