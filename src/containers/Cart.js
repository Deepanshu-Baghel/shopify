import React from "react";

const Cart = () => {
  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const handleClearItem = (index) => {
    // Remove the item at the specified index from the cartItems array
    const updatedCart = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Force a re-render to update the UI
    window.location.reload();
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> - ${item.price}
              <button onClick={() => handleClearItem(index)} style={{ marginLeft: "10px" }}>
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
