import { authOptions } from "@/app/api/auth/[...nextauth]/constants";
import { Box, Button, Stack, TextField } from "@mui/material";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction="column" spacing={2} width={220}>
        <TextField label="Username" />
        <TextField label="Password" />
        <Button variant="contained" style={{ marginTop: 40 }}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
