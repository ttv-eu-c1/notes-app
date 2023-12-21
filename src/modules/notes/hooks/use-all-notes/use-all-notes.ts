import useSWR from "swr";
import { getAllNotes } from "../../lib/get-all-notes/get-all-notes";
import { useCallback } from "react";

export function useAllNotes() {
  const fetcher = useCallback(async ([path]: [path: string]) => {
    return await getAllNotes();
  }, []);
  return useSWR(["/api/notes"], fetcher);
}
