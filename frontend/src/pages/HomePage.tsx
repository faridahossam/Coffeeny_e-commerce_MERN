import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/BaseURL";
import Box from "@mui/material/Box";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again!</Box>;
  }
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
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item md={4}>
              <ProductCard {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default HomePage;
