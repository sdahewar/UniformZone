import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

// //initialising the cart with zeroes
// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < 300; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);

  // //initialising the cart with zeroes
  // const getDefaultCart = () => {
  //   let cart = {};
  //   for (let index = 0; index < 300; index++) {
  //     cart[index] = 0;
  //   }
  //   return cart;
  // };

  //fetching data from the database onto the products section
  // useEffect(() => {
  //   fetch("http://localhost:4000/allproducts")
  //     .then((res) => res.json())
  //     .then((data) => setAll_Product(data));

  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:3001/getcart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         setCartItems(data);
  //       });
  //   }
  // }, []);
  const [cartItems, setCartItems] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_Product(data));
    //Fetch cart data from the backend
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:3001/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCartItems(data);
        })

        // .then((data) => {
        //   // Ensure data is an array and then set the cartItems state
        //   if (Array.isArray(data.cart)) {
        //     setCartItems(data);
        //   } else {
        //     console.error("Invalid cart data format:", data);
        //     setCartItems(data);
        //     const cartLength = Object.keys(cartItems).length;
        //     console.log(`the length of cart is ${cartLength}`);
        //     console.log(data);
        //   }
        // })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  //add to cart
  //add to cart
  // const addToCart = () => {
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:4002/addtocart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("auth-token"),
  //       },
  //       body: JSON.stringify({ itemId: "1" }), // Pass itemId as "1" and itemSize as "M"
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error adding product to cart:", error);
  //       });
  //   }
  // };

  // const addToCart = (productId, selectedSize) => {
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:4002/addtocart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("auth-token"),
  //       },
  //       body: JSON.stringify({ itemId: productId, itemSize: selectedSize }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error adding product to cart:", error);
  //       });
  //   }
  // };

  const addToCart = (productId, selectedSize) => {
    if (localStorage.getItem("auth-token")) {
      axios
        .post(
          "http://localhost:3001/addtocart",
          {
            productId,
            selectedSize,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setCartItems(response.data.user.cart);

          getTotalCartItems();
          // setCartItems((prevCartItems) => {
          //   const updatedCartItems = { ...prevCartItems }; // Create a copy to avoid mutation
          //   updatedCartItems[productId] = (prevCartItems[productId] || 0) + 1; // Update quantity for the added product
          //   const newTotalItems = getTotalCartItems(updatedCartItems); // Calculate new total items
          //   return { ...updatedCartItems, totalItems: newTotalItems }; // Update cartItems with quantity and total items
          // });
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    }
  };

  //remove from cart
  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:4000/removefromcart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/form-data",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId: itemId }),
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }
  // };
  //remove from cart
  // const removeFromCart = (productIdToRemove) => {
  //   if (localStorage.getItem("auth-token")) {
  //     axios
  //       .post(
  //         "http://localhost:3001/removefromcart",
  //         {
  //           productId: productIdToRemove,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "auth-token": localStorage.getItem("auth-token"),
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         // Update cartItems state by filtering out the removed item
  //         setCartItems((prevCartItems) =>
  //           prevCartItems.filter((item) => item.productId !== productIdToRemove)
  //         );
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error removing product from cart:", error);
  //       });
  //   }
  // };
  const removeFromCart = (productIdToRemove, productSize) => {
    if (localStorage.getItem("auth-token")) {
      axios
        .post(
          "http://localhost:3001/removeFromcart",
          {
            productId: productIdToRemove,
            selectedSize: productSize,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        )
        .then((response) => {
          // Update cartItems state with the new cart data from the response
          setCartItems(response.data.cart);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error removing product from cart:", error);
        });
    }
  };

  //get total cart amount
  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = all_product.find(
  //         (product) => product.id === Number(item)
  //       );
  //       totalAmount += cartItems[item] * itemInfo.new_price;
  //     }
  //   }
  //   return totalAmount;
  // };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // Iterate through each key (productId) in the cartItems object
    for (const productId in cartItems) {
      if (cartItems.hasOwnProperty(productId)) {
        const item = cartItems[productId];
        // Check if the item quantity is greater than 0
        if (item.productQuantity > 0) {
          // Calculate the total price for this item (quantity * price)
          totalAmount += item.productQuantity * item.productPrice;
        }
      }
    }

    return totalAmount; // Return the total cart amount
  };

  //get total cart items
  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   // Convert cartItems object to an array of values
  //   const cartItemsArray = Object.values(cartItems);

  //   // Iterate over each item in the cartItems array
  //   cartItemsArray.forEach((item) => {
  //     // Add the quantity of each item to the totalItem count
  //     totalItem++;
  //   });
  //   console.log(totalItem);
  //   return totalItem;
  // };

  const getTotalCartItems = () => {
    let totalItem = Object.keys(cartItems).length;
    console.log(`the length of cartitems object is ${totalItem}`);
    console.log(cartItems);

    // // Iterate over the properties of the cartItems object
    // for (const key in cartItems) {
    //   // Check if the property is not from the prototype chain
    //   if (cartItems.hasOwnProperty(key)) {
    //     // Add the quantity of each item to the totalItem count
    //     totalItem++;
    //     // Assuming each item has a 'quantity' property
    //   }
    // }
    // console.log(cartItems);
    // console.log(totalItem); // Log total number of items
    return totalItem; // Return total number of items
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
