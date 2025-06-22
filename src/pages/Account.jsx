import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom"; // for routing
import "../styles/Account.css";

const Account = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
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

          {/* Profile Picture Upload */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setProfilePic(URL.createObjectURL(e.target.files[0]))} 
          />
          {profilePic && (
            <img 
              src={profilePic} 
              alt="Profile" 
              className="profile-picture"
            />
          )}

          {/* Bio Input */}
          <textarea 
            className="bio-input"
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            placeholder="Write a short bio..."
          />

          {/* Show Bio */}
          {bio && <p className="user-bio">"{bio}"</p>}

          {/* View Favorites Button */}
          <button 
            className="favorites-button"
            onClick={() => navigate("/favorites")}
          >
            View Favorite Songs
          </button>

          {/* Sign Out Button */}
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




