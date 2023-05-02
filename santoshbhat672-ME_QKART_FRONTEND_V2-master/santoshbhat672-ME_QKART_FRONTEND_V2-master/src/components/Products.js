import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from './ProductCard';
import Cart from './Cart';



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


const Products = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [debounceTimeout,setDebounceTimeout] = useState(null);
  const [cart,setCart] = useState(0);
  
  const setCartData = (datas,products)=>{
    let updatedData = datas.map(data => {
      let product = products.find(product => product._id === data.productId);
      return {
          productId: data.productId,
          qty: data.qty,
          cost: product["cost"]
      }
  });
  setCart(updatedData);
  }

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
   const performAPICall = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.endpoint}/products`);
      setProducts(response.data);
      
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
    
      if (token && username) {
        setIsLoggedIn(true);
        fetchCart(token).then((data) =>setCartData(data,response.data));
      } else {
        setIsLoggedIn(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error.response.status === 500)
         enqueueSnackbar(error.message, { variant: "error" });
      return null;      
    }
  };

  useEffect(() => {
    performAPICall();
  }, []);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
   const performSearch = async (text) => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.endpoint}/products/search?value=${text}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setProducts([]);
      setLoading(false);
      if(error.response.status == 404)
        enqueueSnackbar(error.message, { variant: "error" });      
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
   const debounceSearch = (event, debounceTimeout) => {
    if(debounceTimeout)
      clearTimeout(debounceTimeout);
    
    const timeOut = setTimeout(async() => {      
     await performSearch(event.target.value);
    }, 500);
    setDebounceTimeout(timeOut);
  };

  
  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
   const fetchCart = async (token) => {
    if (!token) return null;
  
    try {
      const response = await axios.get(`${config.endpoint}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };
  


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    if(!items || items.length ===0)
      return false;      
    const existingCartItem = items.find((item) => item.productId === productId);
    return existingCartItem;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
   const addToCart = async (product, quantity) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
  
    if (!isLoggedIn || !token || !username) {
      enqueueSnackbar("Login to add an item to the Cart", { variant: "warning" });
      return;
    }
  
    const cart = await fetchCart(token);

    if (isItemInCart(cart,product._id)) {
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", {
        variant: "warning",
      });
      return;
    }
  
    const data = { productId: product._id, qty:quantity};    
    try {
      const response = await axios.post(`${config.endpoint}/cart`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCart = response.data;
      enqueueSnackbar("Item added to cart", { variant: "success" });
      setCartData(updatedCart,products);
    } catch (error) {
      if (error.response?.status === 401) {
        enqueueSnackbar("You are not authorized to add items to the cart", { variant: "error" });
      } else {
        enqueueSnackbar("Could not add item to cart. Please try again later", { variant: "error" });
      }
    }
  };

  const handleQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");
  // hello handleQuantity 

    const data = { productId: productId, qty:quantity };
    try {
      const response = await axios.post(`${config.endpoint}/cart`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCart = response.data;
      enqueueSnackbar("Cart item is updated", { variant: "success" });
      setCartData(updatedCart,products);
    } catch (error) {
      if (error.response?.status === 401) {
        enqueueSnackbar("You are not authorized to update cart items", { variant: "error" });
      } else {
        enqueueSnackbar("Could not update cart item. Please try again later", { variant: "error" });
      }
    }
  };
  

  return (
    <div>
      <Header hasHiddenAuthButtons={isLoggedIn}>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          fullWidth
          style={{ width: "400px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                  <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(event) => debounceSearch(event, debounceTimeout)}
        />
      </Header>

      {/* Search view for mobiles */}
      <TextField
       className="search-mobile"
       size="small"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
                  <Search color="primary" />
           </InputAdornment>
         ),
       }}
       placeholder="Search for items/categories"
       name="search"
       onChange={(event) => debounceSearch(event, debounceTimeout)}
     />
     <Grid container>
        <Grid item xs={12} md={isLoggedIn ? 9 : 12}>
              <Grid container>
                <Grid item className="product-grid">
                  <Box className="hero">
                    <p className="hero-heading">
                      India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                      to your door step
                    </p>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ flexGrow: 1 }} className="Products__content">
                  {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                      <h4>Loading Products</h4>
                    </Box>
                  ) : (
                    <Grid
                      style={{ marginTop: "15px", marginBottom: "15px" }}
                      container
                      spacing={{ xs: 2, md: 3 }}
                      alignItems="stretch"
                    >
                      {products.length > 0 ? (
                        products.map((product) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={product._id}
                          >
                            <ProductCard product={product} handleAddToCart={addToCart} />
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            <SentimentDissatisfied
                              sx={{ fontSize: "100px", color: "#ccc" }}
                            />
                            <p>No products found</p>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Box>
          </Grid>
        {isLoggedIn && (
           <Grid item xs={12} md={3} className="cartContainer" style={{ backgroundColor: '#E9F5E1' }}>
             <Cart products={products} items={cart} handleQuantity={handleQuantity} />
         </Grid>
        )}
       </Grid>
      <Footer/>
    </div>
  );
};

export default Products;
