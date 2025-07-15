import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
import CoffeeIcon from "@mui/icons-material/Coffee";

const OrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();
  
  useEffect(() => {
    getMyOrders();
  }, []);

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
              My Orders
            </Typography>
          </Box>

          {myOrders.length === 0 ? (
            <Typography sx={{ color: "#6D4C41", textAlign: "center", py: 4 }}>
              You haven't placed any orders yet.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {myOrders.map(({ _id, address, orderItems, total }) => (
                <Box 
                  key={_id}
                  sx={{ 
                    border: "1px solid #D7CCC8",
                    borderRadius: 2,
                    p: 3,
                    backgroundColor: "#FFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#3E2723", mb: 1 }}>
                    Order #{_id.slice(-6).toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: "#6D4C41", mb: 1 }}>
                    <strong>Address:</strong> {address}
                  </Typography>
                  <Typography sx={{ color: "#6D4C41", mb: 1 }}>
                    <strong>Items:</strong> {orderItems.length}
                  </Typography>
                  <Typography sx={{ color: "#3E2723", fontWeight: 600 }}>
                    <strong>Total:</strong> {total.toFixed(2)} EGP
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default OrdersPage;