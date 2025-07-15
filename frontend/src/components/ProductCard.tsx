import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/Cart/CartContext";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCard({ _id, title, image, price }: Props) {
  const { addItemToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 360 }}>
      <CardMedia sx={{ height: 200 }} image={image} title={_id} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        {isAuthenticated ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#D7CCC8",
              color: "#3E2723",
              "&:hover": {
                backgroundColor: "#BCAAA4",
              },
              px: 3,
              fontWeight: 600,
            }}
            onClick={() => addItemToCart(_id)}
          >
            Add To Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#D7CCC8",
              color: "#3E2723",
              "&:hover": {
                backgroundColor: "#BCAAA4",
              },
              px: 3,
              fontWeight: 600,
            }}
            onClick={() => navigate("/login")}
          >
            Add To Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}