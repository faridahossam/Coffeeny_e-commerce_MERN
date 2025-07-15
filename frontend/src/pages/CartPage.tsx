import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const renderCartItems = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {cartItems.map((item) => (
        <Box
          key={item.productId}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderRadius: 3,
            boxShadow: 1,
            bgcolor: "#fff",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography color="text.secondary">
                {item.quantity} x {item.unitPrice} EGP
              </Typography>
              <Button
                size="small"
                color="error"
                onClick={() => handleRemoveItem(item.productId)}
              >
                Remove
              </Button>
            </Box>
          </Box>

          <ButtonGroup
            size="large"
            variant="text"
            sx={{
              "& .MuiButton-root": {
                // Styles for all buttons in the group
                backgroundColor: "#D7CCC8",
                color: "#3E2723",
                borderRadius: "0", // Remove rounded corners for clean lines
                borderRight: "1px solid #3E2723", // Add divider line
                "&:last-child": {
                  borderRight: "none", // Remove divider from last button
                },
                "&:hover": {
                  backgroundColor: "#BCAAA4",
                },
              },
            }}
          >
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity - 1)}
              sx={{
                backgroundColor: "#D7CCC8",
                color: "#3E2723",
                "&:hover": {
                  backgroundColor: "#BCAAA4",
                },
              }}
            >
              -
            </Button>
            <Button
              disabled
              sx={{
                backgroundColor: "#D7CCC8",
                color: "#3E2723",
              }}
            >
              {item.quantity}
            </Button>
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity + 1)}
              sx={{
                backgroundColor: "#D7CCC8",
                color: "#3E2723",
                "&:hover": {
                  backgroundColor: "#BCAAA4",
                },
              }}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      ))}

      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#3E2723" }}>
          Total: {totalAmount.toFixed(2)} EGP
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleCheckout}
          disabled={!cartItems.length}
          sx={{
            backgroundColor: "#D7CCC8",
            color: "#3E2723",
            "&:hover": {
              backgroundColor: "#BCAAA4",
            },
            px: 3,
            fontWeight: 600,
          }}
        >
          Go to Checkout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F0E8", // Warm light beige background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 1,
      }}
    >
      <Container fixed sx={{ mt: 0 }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography
            sx={{
              color: "#3E2723",
              fontFamily: "'Playfair Display', serif",
            }}
            variant="h4"
          >
            My Cart
          </Typography>
          {cartItems.length ? (
          <Button size="small" color="error" onClick={() => clearCart()}>
            Clear Cart
          </Button>):""}
        </Box>
        {cartItems.length ? (
          renderCartItems()
        ) : (
          <Typography
            sx={{
              color: "#3E2723",
              fontFamily: "'Playfair Display', serif",
            }}
            variant="h5"
          >
            Your cart is empty. Please start shopping{" "}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
