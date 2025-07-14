import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();
  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };

  const renderCartItems = () => (<Box display="flex" flexDirection="column" gap={2}>
      {cartItems.map((item) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            border: 1,
            borderColor: "#f2f2f2",
            borderRadius: 5,
            padding: 1,
          }}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <img src={item.image} width={100} />
            <Box>
              <Typography variant="h6">{item.title} </Typography>
              <Typography>
                {item.quantity} x {item.unitPrice} EGP
              </Typography>
              <Button onClick={() => handleRemoveItem(item.productId)}>
                Remove Item
              </Button>
            </Box>
          </Box>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity - 1)}
            >
              -
            </Button>
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity + 1)}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box>
        <Typography variant="h6">
          Total Amount: {totalAmount.toFixed(2)} EGP
        </Typography>
      </Box>
  </Box>
    );
    
  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </Box>
      {cartItems.length ? (
        renderCartItems()
      ) : (
        <Typography>Your cart is empty. Please start shopping </Typography>
      )}
    </Container>
  );
};

export default CartPage;
