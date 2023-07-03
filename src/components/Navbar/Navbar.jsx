import React from 'react';
import './style.css';
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { isEmpty } from '../../utils/helpers';
function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const isLoggedIn = !isEmpty(currentUser);

  const handleLogout = () => {
    setCurrentUser({});
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="logo-button" onClick={() => window.location.href="/"}>Firebased</button>
      </div>
      {isLoggedIn && (

      <div className="navbar-right">
        <div className="dropdown">
          <button className="dropdown-toggle">
            <img className="user-profile-pic" src={currentUser?.profilePic} alt="User Profile" />
            <span className="username">{currentUser?.fullName}</span>
          </button>
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="dropdown-option">Logout</button>
          </div>
        </div>
      </div>
      )}

    </nav>
  );
}

export default Navbar;
