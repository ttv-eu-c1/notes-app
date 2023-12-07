import { NextRequest, NextResponse } from "next/server";

export interface Note {
  id: string;
  title: string;
  content: string;
}

let notes: Note[] = [];

export const POST = async (req: NextRequest, res: NextResponse) => {
  const note: Note = await req.json();
  notes.push(note);
  console.log("@@ all notes: ", notes);
  return NextResponse.json(note);
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json(notes);
};
