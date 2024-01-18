"use client";

import { useNoteById } from "@/modules/notes/hooks/use-note-by-id/use-note-by-id";
import { useParams } from "next/navigation";

export default function NotePage() {
  const params = useParams();
  const note = useNoteById(params.id as string);
  return (
    <div>{note.data?.content.split("\n").map((p) => <p key={p}>{p}</p>)}</div>
  );
}
