import { Container, Grid, Stack } from "@mui/material";
import { Form } from "./components/form/form";
import NotesList from "./components/notes-list/notes-list";

export default async function DashboardPage() {
  return (
    <Container>
      <Grid container width="100%" spacing={2}>
        <Grid item xs={12} sm={4}>
          <Form />
        </Grid>
        <Grid item xs={12} sm={8}>
          <NotesList />
        </Grid>
      </Grid>
    </Container>
  );
}
