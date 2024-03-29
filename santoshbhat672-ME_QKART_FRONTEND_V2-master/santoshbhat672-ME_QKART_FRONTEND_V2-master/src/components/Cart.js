import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
 export const generateCartItemsFrom = (cartData, productsData) => {
  const cartItems = cartData.map(cartItem => {
    const product = productsData.find(product => product._id === cartItem.productId);
    const { _id, name, category, cost, rating, image } = product;
    const qty = cartItem.qty;
    return { _id, name, category, cost, rating, image, qty, productId: cartItem.productId };
  });
  return cartItems;
};


/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
 export const getTotalCartValue = (items = []) => {
  const totalValue = items.reduce((accumulator, item) => {
    return accumulator + (item.qty * item.cost);
  }, 0);

  return totalValue;
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  isReadOnly,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      {!isReadOnly && (
         <IconButton size="small" color="primary" onClick={handleDelete}>
           <RemoveOutlined />
         </IconButton>
      )}      
      <Box padding="0.5rem" data-testid="item-qty">
        {isReadOnly ? ("Qty: "+value):(value)}
      </Box>
      {!isReadOnly && (
          <IconButton size="small" color="primary" onClick={handleAdd}>
            <AddOutlined />
          </IconButton>
      )}      
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const Cart = ({
  products,
  items = [],
  handleQuantity,
  isReadOnly,
}) => {

  const history = useHistory();

 if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }
  
  const cartItems = items.map(item => {
    const product = products.find(p => p._id === item.productId);
    return (
      <Box key={item.productId} display="flex" alignItems="flex-start" padding="1rem">
        <Box className="image-container">
          <img src={product.image} alt={product.name} width="100%" height="100%" />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="6rem" paddingX="1rem">
          <div>{product.name}</div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <ItemQuantity
              value={item.qty}
              handleAdd={() => handleQuantity(item.productId, item.qty + 1)}
              handleDelete={() => handleQuantity(item.productId, item.qty - 1)}
              isReadOnly={isReadOnly}
            />
            <Box padding="0.5rem" fontWeight="700">
              ${product.cost}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  });

  const totalValue = getTotalCartValue(items);

  return (
    <Box>
      <h1>Cart</h1>
      {cartItems}
      <Box display="flex" justifyContent="flex-end" padding="1rem" data-testid="cart-total">
        {/* <Box fontWeight="700" marginRight="1rem">
          Total:
        </Box> */}
        <Box fontWeight="700">
          ${totalValue}
        </Box>
      </Box>
      {!isReadOnly &&(
        <Button variant="contained" startIcon={<ShoppingCart />} onClick={() => history.push("/checkout")}>
        Checkout
      </Button>
      )}      
    </Box>
  );
};



export default Cart;
