"use client";

import { useAllNotes } from "@/modules/notes/hooks/use-all-notes/use-all-notes";
import { CircularProgress, Container, Stack } from "@mui/material";
import { NoteCounter } from "../note-counter/note-counter";
import Link from "next/link";

export default function NotesList() {
  const { data: notes, isLoading } = useAllNotes();

  return (
    <Stack>
      <NoteCounter />
      {isLoading && <CircularProgress />}
      {notes?.map((n) => (
        <div key={n.title}>
          <Link href={`/dashboard/note/${n.id}`}>
            <h4>{n.title}</h4>
          </Link>
        </div>
      ))}
    </Stack>
  );
}
