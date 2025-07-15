import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";
import { BASE_URL } from "../constants/BaseURL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import CoffeeIcon from "@mui/icons-material/Coffee";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const handleConfirmOrder = async () => {
    const address = addressRef?.current?.value;
    if (!address) {
      return;
    }
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
      }),
    });
    if (!response.ok) {
      return;
    }
    navigate("/order-success");
  };

  const renderCartItems = () => (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        border: "1px solid #D7CCC8",
        borderRadius: 2,
        padding: 3,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        mb: 3,
      }}
    >
      {cartItems.map((item) => (
        <Box
          key={item.productId}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          sx={{
            py: 1,
            borderBottom: "1px solid #EFEBE9",
            "&:last-child": {
              borderBottom: "none",
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            width="100%"
          >
            <img 
              src={item.image} 
              width={80} 
              height={80}
              style={{
                borderRadius: 1,
                objectFit: "cover",
              }}
            />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="body1" sx={{ color: "#3E2723", fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#6D4C41" }}>
                {item.quantity} x {item.unitPrice} EGP
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "right", color: "#3E2723", fontWeight: 600 }}>
          Total Amount: {totalAmount.toFixed(2)} EGP
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F0E8",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            p: 4,
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <CoffeeIcon sx={{ fontSize: 40, color: "#3E2723" }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#3E2723",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Coffeeny Checkout
            </Typography>
          </Box>

          {/* Delivery Address */}
          <Typography variant="h6" sx={{ color: "#3E2723", mb: 2 }}>
            Delivery Information
          </Typography>
          <TextField
            inputRef={addressRef}
            label="Delivery address"
            name="address"
            fullWidth
            sx={{
              mb: 4,
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

          {/* Order Summary */}
          <Typography variant="h6" sx={{ color: "#3E2723", mb: 2 }}>
            Order Summary
          </Typography>
          {renderCartItems()}

          {/* Checkout Button */}
          <Button
            variant="contained"
            onClick={handleConfirmOrder}
            fullWidth
            sx={{
              py: 1.5,
              backgroundColor: "#3E2723",
              "&:hover": {
                backgroundColor: "#5D4037",
              },
            }}
          >
            Complete Checkout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutPage;