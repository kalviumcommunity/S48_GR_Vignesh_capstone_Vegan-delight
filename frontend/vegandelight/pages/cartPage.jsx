import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // Calculate total cost
    const calculatedTotalCost = storedCartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
    setTotalCost(calculatedTotalCost);
  }, []);

  const placeOrder = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in session storage");
      return;
    }

    const orderDate = new Date();
    const orderData = {
      userId,
      orderItems: cartItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Ensure quantity is provided
      })),
      orderBill: totalCost,
      orderDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/createorders",
        orderData
      );
      if (response.status === 201) {
        setOrderPlaced(true);
        sessionStorage.removeItem("cart");
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        {orderPlaced ? (
          <p>Order placed successfully!</p>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
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
                        <p>Quantity: {item.quantity || 1}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>Total Cost: ₹{totalCost}</p>
                <button onClick={placeOrder}>Place Order</button>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
