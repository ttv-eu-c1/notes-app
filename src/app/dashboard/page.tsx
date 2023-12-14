"use client";

import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NoteInput } from "../api/notes/route";
import { Note } from "@prisma/client";

const emptyNote: NoteInput = {
  title: "",
  content: "",
};

export default function DashboardPage() {
  const [note, setNote] = useState<NoteInput>(emptyNote);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/api/notes").then(async (res) => {
      const notesResponse = await res.json();
      setNotes(notesResponse);
    });
  }, []);

  return (
    <Container maxWidth="xs">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch("/api/notes", {
            method: "POST",
            body: JSON.stringify(note),
          });
          console.log("@@ response: ", response);
          fetch("/api/notes").then(async (res) => {
            const notesResponse = await res.json();
            setNotes(notesResponse);
          });
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

      <Stack>
        {notes.map((n) => (
          <div key={n.title}>
            <h4>{n.title}</h4>
            <p>{n.content}</p>
          </div>
        ))}
      </Stack>
    </Container>
  );
}
