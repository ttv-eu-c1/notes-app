import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { Note } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface GetNoteByIdResponse {
  note: Note;
}

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  const note = await prisma.note.findUniqueOrThrow({
    where: { id },
  });
  return NextResponse.json<GetNoteByIdResponse>({
    note,
  });
};
