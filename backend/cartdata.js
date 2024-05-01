const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 4001;

mongoose
  .connect(
    "mongodb+srv://shashank:dskmongo@ecom-wb.ooawflp.mongodb.net/e-commerce"
  )
  .then((con) => {
    console.log("connection to DB success!");
  });

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  cartData: Object,
});

const Order = mongoose.model("Order", orderSchema);
const Users = mongoose.model("User", orderSchema);

// async function getUserAndSaveToOrder() {
//   try {
//     const userdata = await Users.findById("662cf8a15099c819a81c3b72");

//     const customername = userdata.name;
//     const customeremail = userdata.email;
//     const customerorder = userdata.cartData;

//     // Create a new order document using the retrieved user data
//     const newOrder = new Order({
//       name: customername,
//       email: customeremail,
//       cartData: customerorder,
//     });

//     // Save the new order document to the Order collection
//     await newOrder.save();

//     console.log("Order created and saved successfully.");
//   } catch (error) {
//     console.error(error);
//   }
// }

// getUserAndSaveToOrder();
async function getUserAndSaveToOrder(userId) {
  try {
    const userdata = await Users.findById(userId);

    if (!userdata) {
      console.error("User not found.");
      return;
    }

    const { name, email, cartData } = userdata;

    // Create a new order document using the retrieved user data
    const newOrder = new Order({
      name,
      email,
      cartData,
    });

    // Save the new order document to the Order collection
    await newOrder.save();

    console.log("Order created and saved successfully.");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getUserAndSaveToOrder };

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
