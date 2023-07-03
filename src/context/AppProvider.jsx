import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const myUser = () => {
    let user = localStorage.getItem("userDetails");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  };
  const [cUser, setCUser] = useState(myUser);

  const setCurrentUser = (val) => {
    setCUser(val);
  };
  const contextValue = {
    currentUser: cUser,
    setCurrentUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
