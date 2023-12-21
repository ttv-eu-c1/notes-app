import { useAllNotes } from "@/modules/notes/hooks/use-all-notes/use-all-notes";
import { CircularProgress, Typography } from "@mui/material";

export function NoteCounter() {
  const { data: notes, isLoading } = useAllNotes();
  const noteCount = notes?.length || 0;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Typography variant="h4">{noteCount}</Typography>
  );
}
