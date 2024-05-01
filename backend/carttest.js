const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const Users = require("./index");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://shashank:dskmongo@ecom-wb.ooawflp.mongodb.net/e-commerce"
  )
  .then((con) => {
    console.log("connection to DB success!");
    console.log(typeof Users);
    console.log(typeof fetchuser);
  });

const cartSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  productSize: String,
  productQuantity: Number,
  userId: String,
});

const Cart = mongoose.model("Cart", cartSchema);

// MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

//schema for creating products
// const Product = mongoose.model("Product", {
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   avilable: {
//     type: Boolean,
//     default: true,
//   },
// });

//schema for creating products
const Productsforcart = mongoose.model("Productsforcart", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

// // // Schema for creating user model
// const Usersforcart = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   cartData: {
//     type: Object,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   cart: {
//     type: Array,
//     default: [],
//   },
// });

// app.get("/allproducts", async (req, res) => {
//   let products = await Productsforcart.find({});
//   console.log("All Products");
//   res.send(products);
// });

// // POST route to set products for a user's cart
// app.post("/setproducts", async (req, res) => {
//   try {
//     console.log("Setting products for cart");

//     // Fetch all products from the 'products' collection
//     let products = await Product.find({});

//     // Insert products into the 'productsforcart' collection
//     await Productsforcart.insertMany(products);

//     res.send("Products set for cart");
//   } catch (err) {
//     console.error("Error setting products for cart:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  const product = await Productsforcart.findOne({ id: productId });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  console.log("Product found:", product);
  res.send(product);
});

app.post("/addtocart", fetchuser, async (req, res) => {
  try {
    const { productId, selectedSize } = req.body;
    if (!productId || !selectedSize) {
      return res
        .status(400)
        .send({ message: "Missing productId or selectedSize in request body" });
    }

    console.log("Received productId:", productId);
    console.log("Received selectedSize:", selectedSize);
    // const { itemId, itemSize } = req.body || {};
    // if (!itemId || !itemSize) {
    //   return res
    //     .status(400)
    //     .send({ message: "Missing itemId or itemSize in request body" });
    // }
    // console.log(`the itemid is : ${itemId}`);
    // console.log(`the itemsize is : ${itemSize}`);
    const product = await Productsforcart.findOne({ id: productId }); // Find product with ID 32
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Create a new cart item object
    const cartItem = {
      productId: product.id,
      productName: product.name,
      productSize: selectedSize,
      productQuantity: 1,
      productPrice: product.new_price,
    };

    console.log(`The product to be added is ${cartItem.productName} `);

    // // Find the user and update the cart data
    // const updatedUser = await Users.findOneAndUpdate(
    //   { name: "tuyam" },
    //   { $addToSet: { cart: cartItem } }, // Add the cart item to the 'cart' field
    //   { new: true }
    // );
    //Find the user
    console.log(req.user.id);
    const currentUser = req.user;
    let updatedUser = await Users.findOne({ _id: currentUser.id });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    //Ensure cart is initialized as an array if it doesn't exist yet
    if (!updatedUser.cart) {
      updatedUser.cart = [];
    }
    console.log(`Pre existing user cart is ${updatedUser.cart}`);

    // Check if a cart item with the same productId and productSize already exists
    const existingCartItemIndex = updatedUser.cart.findIndex(
      (item) =>
        item.productId === cartItem.productId &&
        item.productSize === cartItem.productSize
    );
    console.log(existingCartItemIndex);
    // console.log(updatedUser.cart[existingCartItemIndex].productQuantity);

    if (existingCartItemIndex !== -1) {
      // If a matching cart item exists, increment the productQuantity
      updatedUser.cart[existingCartItemIndex].productQuantity++;
      console.log(updatedUser.cart[existingCartItemIndex].productQuantity);
    } else {
      // If not, add the cart item to the cartData array
      updatedUser.cart.push(cartItem);
    }

    // Mark the 'cart' array as modified
    updatedUser.markModified("cart");
    // Save the updated user document
    await updatedUser.save();
    // Fetch the updated user with populated cart data
    updatedUser = await Users.findOne({ _id: currentUser.id }).populate(
      "cart.productId"
    );

    // Send the updated user object with populated cart data in the response
    res.send({ user: updatedUser });

    // res.send("Product added to cart");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});
// app.post("/removefromcart", async (req, res) => {
//   try {
//     // Find the user by name
//     const user = await Users.findOne({ _id: currentUser._id });

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Check if the user has a cart
//     if (!user.cart || user.cart.length === 0) {
//       return res.status(404).send({ message: "Cart is empty" });
//     }

//     // Find the index of the cart item to remove
//     const indexToRemove = user.cart.findIndex(
//       (item) => item.productId == "22" && item.productSize == "M"
//     );

//     if (indexToRemove === -1) {
//       return res.status(404).send({ message: "Product not found in cart" });
//     }
//     if (user.cart[indexToRemove].productQuantity > 1) {
//       user.cart[indexToRemove].productQuantity--;
//     } else {
//       // Remove the cart item from the user's cart array
//       user.cart.splice(indexToRemove, 1);
//     }

//     // Mark the 'cart' array as modified
//     user.markModified("cart");
//     // Save the updated user document
//     await user.save();

//     res.send("Product removed from cart");
//   } catch (error) {
//     console.error("Error removing product from cart:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

app.post("/removeFromcart", fetchuser, async (req, res) => {
  try {
    const currentUser = req.user; // Get the current user from the request

    // Find the user by id
    const user = await Users.findById(currentUser.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the user has a cart
    if (!user.cart || user.cart.length === 0) {
      return res.status(404).send({ message: "Cart is empty" });
    }

    // Find the index of the cart item to remove based on productId and selectedSize
    const indexToRemove = user.cart.findIndex(
      (item) =>
        item.productId === req.body.productId &&
        item.productSize === req.body.selectedSize
    );

    if (indexToRemove === -1) {
      return res.status(404).send({ message: "Product not found in cart" });
    }

    // If the product quantity is greater than 1, decrement the quantity
    if (user.cart[indexToRemove].productQuantity > 1) {
      user.cart[indexToRemove].productQuantity--;
    } else {
      // Remove the cart item from the user's cart array if the quantity is 1
      user.cart.splice(indexToRemove, 1);
    }

    // Mark the 'cart' array as modified
    user.markModified("cart");

    // Save the updated user document
    await user.save();
    // Fetch the updated user with populated cart data
    const updatedUser = await Users.findById(currentUser.id).populate(
      "cart.productId"
    );

    res.send(updatedUser);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/getcart", fetchuser, async (req, res) => {
  try {
    // Fetch the current user's cart from the database
    const currentUser = req.user;
    const user = await Users.findById(currentUser.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Extract cart data from the user document
    const cartData = user.cart || [];

    res.json(cartData);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`carttest running on ${port}`);
});
