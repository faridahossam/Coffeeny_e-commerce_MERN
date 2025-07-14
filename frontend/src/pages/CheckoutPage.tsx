import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";
import { BASE_URL } from "../constants/BaseURL";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

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
        border: 1,
        borderColor: "#f2f2f2",
        borderRadius: 5,
        padding: 1,
      }}
    >
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            width="100%"
          >
            <img src={item.image} width={100} />
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography variant="h6">{item.title} </Typography>
              <Typography>
                {item.quantity} x {item.unitPrice} EGP
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="body2" sx={{ textAlign: "right" }}>
          Total Amount: {totalAmount.toFixed(2)} EGP
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container
      fixed
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery address"
        name="address"
        fullWidth
      ></TextField>
      {renderCartItems()}
      <Button variant="contained" onClick={handleConfirmOrder}>
        Complete To Checkout
      </Button>
    </Container>
  );
};

export default CheckoutPage;
