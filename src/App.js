import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
    </div>
  );
};

export default App;
