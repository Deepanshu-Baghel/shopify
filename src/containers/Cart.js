import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const Cart = () => {
  const navigate = useNavigate();

  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    // Calculate the initial total bill when the component mounts
    const initialBill = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalBill(initialBill);
  }, [cartItems]);

  const handleClearItem = (index) => {
    // Remove the item at the specified index from the cartItems array
    const updatedCart = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Force a re-render to update the UI
    window.location.reload();
  };

  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  const handleDownloadBill = () => {
    // Create a new instance of jsPDF
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text("GLA Shop", 10, 10);
    pdf.text("------------------------", 10, 20);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);
    pdf.text(`Time: ${new Date().toLocaleTimeString()}`, 10, 40);
    pdf.text("------------------------", 10, 50);
    pdf.text("Items in Cart:", 10, 60);
    
    // Group cart items by title and calculate quantities
    const groupedItems = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((group) => group.title === item.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ title: item.title, price: item.price, quantity: 1 });
      }
      return acc;
    }, []);

    // Add grouped items to the PDF
    let yPosition = 70;
    groupedItems.forEach((item) => {
      pdf.text(`${item.title} * ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`, 10, yPosition);
      yPosition += 10;
    });

    pdf.text("------------------------", 10, yPosition);
    yPosition += 10;
    pdf.text(`Total Bill: $${totalBill.toFixed(2)}`, 10, yPosition);
    pdf.text("------------------------", 10, yPosition + 10);
    pdf.text("Thank you for shopping with us!", 10, yPosition + 20);

    // Save the PDF as "fake_bill.pdf" and open a download prompt
    pdf.save("fake_bill.pdf");
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <button onClick={handleGoBack} style={{ marginRight: "10px" }}>
        Go Back
      </button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
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
          <button onClick={handleDownloadBill} style={{ marginTop: "10px" }}>
            Download Bill - Total Bill: ${totalBill.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
