import { GetAllNotesResponse } from "@/app/api/notes/route";

export async function getAllNotes() {
  const response = await fetch(`/api/notes`);
  const json: GetAllNotesResponse = await response.json();
  return json.notes;
}
