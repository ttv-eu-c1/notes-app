import useSWR from "swr";
import { getAllNotes } from "../../lib/get-all-notes/get-all-notes";
import { useCallback } from "react";
import { getNoteById } from "../../lib/get-note-by-id/get-note-by-id";

export function useNoteById(id: string) {
  const fetcher = useCallback(
    async ([path, innerId]: [path: string, id: string]) => {
      return await getNoteById(innerId);
    },
    [],
  );
  return useSWR(["/api/notes", id], fetcher);
}
