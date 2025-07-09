import { Box, Container, TextField, Typography } from "@mui/material";

const RegisterPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4">Register Now Account</Typography>
      </Box>
      <Box sx={{display:"flex" }}>
        <TextField label="Full Name" name="fullName"/>
        <TextField label="Email" name="email"/>
        <TextField label="Password" name="password"/>

      </Box>
    </Container>
  );
};
export default RegisterPage;
