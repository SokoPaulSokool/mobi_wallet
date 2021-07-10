import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import GlobalProvider from "./context/provider";

function App() {

  return (
    <GlobalProvider>
      <div className="App">
      </div>
    </GlobalProvider>
  );
}

export default App;
