"use client";

import { useAllNotes } from "@/modules/notes/hooks/use-all-notes/use-all-notes";
import { CircularProgress, Container, Stack } from "@mui/material";
import { NoteCounter } from "../note-counter/note-counter";

export default function NotesList() {
  const { data: notes, isLoading } = useAllNotes();

  return (
    <Stack>
      <NoteCounter />
      {isLoading && <CircularProgress />}
      {notes?.map((n) => (
        <div key={n.title}>
          <a href="#">
            <h4>{n.title}</h4>
          </a>
        </div>
      ))}
    </Stack>
  );
}
