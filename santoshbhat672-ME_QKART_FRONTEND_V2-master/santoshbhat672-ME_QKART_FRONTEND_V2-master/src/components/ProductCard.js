import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  CardActionArea
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const { name, category, cost, rating, image } = product;
  return (
    <Card sx={{ maxWidth: 345 }} className="card">
    <CardActionArea>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
          ${cost}
        </Typography>
        <Rating name="product-rating" value={rating} precision={0.5} readOnly />
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Button
          className="auth-button"
          variant="contained"
          size="small"
          color="primary"
          startIcon={<AddShoppingCartOutlined />}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() => handleAddToCart(product,1)}
        >
          Add to cart
    </Button>

    </CardActions>
  </Card>
  );
};

export default ProductCard;
