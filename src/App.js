import React from "react";
import { Switch, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";

/**
 * TODO: Instead of using this state variable to keep track of which page
 * we're on, use the URL in the browser's address bar. This will ensure that
 * users can use the browser's back and forward buttons to navigate between
 * pages, as well as provide a good URL they can bookmark and share.
 */

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
