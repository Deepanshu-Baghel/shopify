// Signin.js

import React, { useState, useEffect } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from './firebase'; // Adjust the path based on your file structure

const Signin = () => {
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem('isSignedIn') === 'true');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/home');
    }
  }, [isSignedIn, navigate]);

  const [userData, setUserData] = useState({
    userNumber: '',
    userPass: '',
  });

  function postUserData(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Handle the signed-in user
      const userEmail = result.user.email;
      localStorage.setItem('isSignedIn', 'true');
      localStorage.setItem('userEmail', userEmail);
      setIsSignedIn(true);
      setUserEmail(userEmail);
      // Perform actions like redirecting to another page
      navigate('/');
    } catch (error) {
      // Handle errors
      console.error('Google sign-in error:', error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your custom logic for handling the form submission or user authentication here
  };

  return (
    <>
      <div className='Page'>
        <div className='loginBox'>
          <center>
            <h4>Login to GLA SHOP</h4>
          </center>
          {isSignedIn ? (
            <div>
              <p>Welcome, {userEmail}!</p>
              {/* Add other content for signed-in users */}
            </div>
          ) : (
            <form className='form' onSubmit={handleSubmit}>
              <p>&nbsp;&nbsp;Mobile </p>
              <input
                type='mobile'
                name='userNumber'
                value={userData.userNumber}
                onChange={postUserData}
              />
              <p>&nbsp;&nbsp;Password</p>
              <input
                type='password'
                name='userPass'
                value={userData.userPass}
                onChange={postUserData}
              />
              <input
                style={{ margin: '10% 0% 20% 20%', backgroundColor: 'beige', width: '60%' }}
                type='submit'
              />
              <button style={{ margin: '10% 0% 20% 20%' }} onClick={signInWithGoogle}>
                Sign in with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Signin;
