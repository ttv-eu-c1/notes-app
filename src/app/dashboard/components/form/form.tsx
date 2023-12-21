"use client";

import { NoteInput } from "@/app/api/notes/route";
import { useAllNotes } from "@/modules/notes/hooks/use-all-notes/use-all-notes";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const emptyNote: NoteInput = {
  title: "",
  content: "",
};

export function Form() {
  const [note, setNote] = useState<NoteInput>(emptyNote);
  const { data: notes, mutate, isLoading } = useAllNotes();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(note),
        });
        await mutate();
      }}
    >
      <Stack direction="column" spacing={2}>
        <h1>Dashboard Page</h1>
        <TextField
          label="Title"
          onChange={(e) =>
            setNote((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextField
          label="Content"
          onChange={(e) =>
            setNote((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <Button type="submit" variant="contained">
          Submit!
        </Button>
      </Stack>
    </form>
  );
}
