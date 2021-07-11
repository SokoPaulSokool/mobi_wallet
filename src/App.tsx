import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import GlobalProvider from "./context/provider";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {

  return (
    <GlobalProvider>
      <div className="App">
       <LandingPage></LandingPage>
      </div>
    </GlobalProvider>
  );
}

export default App;
