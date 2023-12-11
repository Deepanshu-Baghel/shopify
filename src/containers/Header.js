import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

const Header = () => {
  // Check if the user is signed in based on the local storage
  const isSignedIn = localStorage.getItem("isSignedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");

  const navigate = useNavigate();
  const handleSignOut = () => {
    // Remove the user's sign-in status from local storage
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("userEmail");
    
    navigate('/');

    // Perform any other necessary actions, such as redirecting the user
    // For example, you can use the React Router history object if available
    // history.push("/signin");
    // Or you can use window.location.href to navigate
    // window.location.href = "/signin";
  };

  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2>GLA SHOP</h2>
      </div>
      {isSignedIn ? (
        <div>
          <p style={{ marginRight: "10px" }}>Welcome, {userEmail}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Link to="/signin">
          <button style={{ marginRight: "10px" }}>Sign in</button>
        </Link>
      )}
    </div>
  );
};

export default Header;
