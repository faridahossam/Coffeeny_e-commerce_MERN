import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/BaseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import CoffeeIcon from "@mui/icons-material/Coffee";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials. Please try again.");
        return;
      }

      const token = await response.json();
      if (!token) {
        setError("Authentication failed. Please try again.");
        return;
      }

      login(email, token);
      navigate("/");
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F0E8", // Warm light beige background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 4,
            textAlign: "center",
          }}
        >
          {/* Logo/Header */}
          <Box sx={{ mb: 4 }}>
            <CoffeeIcon
              sx={{
                fontSize: 48,
                color: "#3E2723",
                mb: 1,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#3E2723",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Coffeeny
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#6D4C41", mt: 1 }}>
              Welcome back! Please login to your account
            </Typography>
          </Box>

          {/* Error Message */}
          {error && (
            <Box
              sx={{
                backgroundColor: "#FFEBEE",
                color: "#C62828",
                p: 2,
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography variant="body2">{error}</Typography>
            </Box>
          )}

          {/* Form */}
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              inputRef={emailRef}
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D7CCC8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#A1887F",
                  },
                },
              }}
            />
            <TextField
              inputRef={passwordRef}
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D7CCC8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#A1887F",
                  },
                },
              }}
            />

            <Button
              onClick={onSubmit}
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#3E2723",
                "&:hover": {
                  backgroundColor: "#5D4037",
                },
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          {/* Footer Links */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ color: "#6D4C41" }}>
              Don't have an account?{" "}
              <Typography
                component="span"
                sx={{
                  color: "#3E2723",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
