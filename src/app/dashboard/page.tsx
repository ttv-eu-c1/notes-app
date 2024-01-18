import { Container, Stack } from "@mui/material";
import { Form } from "./components/form/form";
import NotesList from "./components/notes-list/notes-list";

export default async function DashboardPage() {
  return (
    <Container maxWidth="xs">
      <Stack direction="row" spacing={4}>
        <Form />
        <NotesList />
      </Stack>
    </Container>
  );
}
