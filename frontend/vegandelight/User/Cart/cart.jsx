import React, { useState, useEffect } from "react";
import "../styles/cart.css";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== itemToRemove._id
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item._id} className="cart-item">
              <img
                src={`http://localhost:3000/uploads/${item.image}`}
                alt={item.name}
                className="cart-image"
              />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
