import React from "react";
import "./App.css";
import ApiCall from "./components/ApiCall";
import User from "./views/User";

function App() {
  return (
    <>
      <header>
        <ApiCall />
        <User />
      </header>
    </>
  );
}

export default App;
