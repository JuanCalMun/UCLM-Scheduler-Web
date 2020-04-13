import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/global/Header/Header";
import Home from "./views/Home/Home";
import Subjects from "./views/Subjects/Subjects";
import Scheduler from "./views/Scheduler/Scheduler";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-header-wrapper">
          <Header></Header>
        </div>
        <div className="container App-content-wrapper">
          <Route path="/" exact component={Home} />
          <Route path="/asignaturas" component={Subjects} />
          <Route path="/planificador" component={Scheduler} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
