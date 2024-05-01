import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product: initialProduct } = props;
  const { addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(initialProduct);

  const [selectedSize, setSelectedSize] = useState(""); // State to store selected size
  const authToken = localStorage.getItem("auth-token"); // Get auth-token from local storage

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  // Function to handle size selection
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update selected size state
    console.log(event.target.value);
    console.log(product.id);
  };

  // Function to handle "add to cart" button click
  const handleAddToCart = () => {
    if (!authToken) {
      window.alert("Please login to add to cart");
    }
    // Call the addToCart function with product id and selected size
    addToCart(product.id, selectedSize);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image2} alt="" />
          <img src={product.image3} alt="" />
          <img src={product.image4} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          {/* <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div> */}
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <select
            className="sizeBox"
            onChange={handleSizeChange}
            value={selectedSize}
          >
            <option value="null">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women , T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
