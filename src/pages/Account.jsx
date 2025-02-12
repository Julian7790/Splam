import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../firebase/firebase"; // Import Firebase auth
import "../styles/Account.css";   // Import the CSS file for styling

const Account = () => {
  const { user } = useContext(AuthContext); // Use the user from the AuthContext

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      alert("You have signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-title">Account Page</h1>
      {user ? (
        <div className="account-details">
          <p className="account-welcome">Welcome, {user.email}</p>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <p className="login-prompt">Please log in to view your account details.</p>
      )}
    </div>
  );
};

export default Account;



