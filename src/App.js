import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/global/Header";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <div className="App-header-wrapper">
            <Header></Header>
          </div>
          <div className="App-body-wrapper"></div>
        </div>
    </BrowserRouter>
  );
}

export default App;
