import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "./components/Navbar";
import AppProvider from "./context/AppProvider";
import Auth from "./components/Auth";
import AppContext from "./context/AppContext";
import { isEmpty } from "./utils/helpers";
import Room from "./components/Room";

function Components() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const isLogged = !isEmpty(currentUser);

  return (
    <>
      <Navbar />
      {!isLogged ? <Auth /> : <Room />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Components />
    </AppProvider>
  );
}

export default App;
