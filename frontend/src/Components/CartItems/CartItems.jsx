// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";

// const CartItems = () => {
//   const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
//     useContext(ShopContext);
//   return (
//     <div className="cartitems">
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Size</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (cartItems[e.id] > 0) {
//           return (
//             <div>
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>
//                 <p class="sizeVal">Size</p>
//                 <p class="priceNum">₹{e.new_price}</p>
//                 <button className="cartitems-quantity">
//                   {cartItems[e.id]}
//                 </button>
//                 <p>₹{e.new_price * cartItems[e.id]}</p>
//                 <img
//                   className="cartitems-remove-icon"
//                   src={remove_icon}
//                   onClick={() => {
//                     removeFromCart(e.id);
//                   }}
//                   alt=""
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>cart Totals</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>Free</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <h3>Total</h3>
//               <h3>₹{getTotalCartAmount()}</h3>
//             </div>
//           </div>
//           <button>PLACE ORDER</button>
//         </div>
//         <div className="cartitems-promocode">
//           <p>ENTER YOUR DETAILS</p>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="Name" />
//           </div>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="Phone Number" />
//           </div>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="Address" />
//           </div>
//           <div className="cartitems-promobox">
//             <input type="text" placeholder="Postal Code" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const [deliveryName, setdeliveryName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:4000/addorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          deliveryName,
          phoneNumber,
          address,
          postalCode,
        }),
      });
      if (!deliveryName || !phoneNumber || !address || !postalCode) {
        window.alert("please enter your contact details");
      }

      if (response.ok) {
        console.log("Order placed successfully");
        window.alert("Order placed successfully!");
        // Optionally, you can perform additional actions here, such as clearing the cart or redirecting to a thank you page
      } else {
        console.error("Failed to place order");
        console.log(response);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {/* {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p class="sizeVal">Size</p>
                <p class="priceNum">₹{e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })} */}
      {Object.keys(cartItems).map((productId) => {
        console.log("productId:", productId);
        const item = cartItems[productId];
        console.log("item:", item);
        const product = all_product.find(
          (p) => p.id === parseInt(item.productId)
        );

        console.log("product:", product);
        if (item.productQuantity > 0 && product) {
          console.log("Rendering item:", productId);
          return (
            <div key={productId}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p className="sizeVal">Size: {item.productSize}</p>
                <p className="priceNum">₹{product.new_price}</p>
                <button className="cartitems-quantity">
                  {item.productQuantity}
                </button>
                <p>₹{product.new_price * item.productQuantity}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(item.productId, item.productSize);
                    console.log(
                      `id of product to be removed ${parseInt(productId)}`
                    );
                    console.log(
                      `size of product to be removed ${item.productSize}`
                    );
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={placeOrder}>PLACE ORDER</button>{" "}
          {/* Handle place order */}
        </div>
        <div className="cartitems-promocode">
          <p>ENTER YOUR DETAILS</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Name"
              value={deliveryName}
              onChange={(e) => setdeliveryName(e.target.value)}
            />
          </div>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
