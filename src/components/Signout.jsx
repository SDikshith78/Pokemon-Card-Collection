// src/components/SignOut.jsx
import React from 'react';
import { auth } from '../components/firebase/Firebase';
import { signOut } from 'firebase/auth';



const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('User signed out successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;

