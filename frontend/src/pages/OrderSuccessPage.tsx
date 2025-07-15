import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CoffeeIcon from "@mui/icons-material/Coffee";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F0E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 4,
            textAlign: "center",
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <CoffeeIcon sx={{ fontSize: 40, color: "#3E2723" }} />
            <Typography
              variant="h4"
              noWrap
              component="span"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                letterSpacing: "1px",
                color:"#3E2723"
              }}
            >
              Coffeeny
            </Typography>
          </Box>

          <CheckCircleOutline
            sx={{
              color: "#4CAF50",
              fontSize: "80px",
              mb: 3,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              color: "#3E2723",
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
              mb: 2,
            }}
          >
            Thank you for your order!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#6D4C41",
              mb: 4,
              maxWidth: "400px",
              mx: "auto",
            }}
          >
            Your order is being processed. We'll send you a confirmation email
            shortly.
          </Typography>

          <Button
            variant="contained"
            onClick={handleHome}
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: "#3E2723",
              "&:hover": {
                backgroundColor: "#5D4037",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderSuccessPage;
