import { GetNoteByIdResponse } from "@/app/api/notes/[id]/route";

export async function getNoteById(id: string) {
  const response = await fetch(`/api/notes/${id}`);
  const json: GetNoteByIdResponse = await response.json();
  return json.note;
}
