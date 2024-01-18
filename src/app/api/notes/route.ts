import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { Note } from "@prisma/client";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";

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
      }
    );
  }

  const note: NoteInput = await req.json();
  const created = await prisma.note.create({
    data: {
      ...note,
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
