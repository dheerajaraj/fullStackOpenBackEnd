import React, { useState, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { notEqual } from "assert";

const App = () => {
  const padding = {
    padding: 5,
  };
  const match = useRouteMatch("/menu/:id");
  const menu = match
    ? menus.find((menu) => menu.id === Number(match.params.id))
    : null;

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/restaurant">
          restaurant
        </Link>
        <Link style={padding} to="/menu">
          Menu
        </Link>
        <Link style={padding} to="/orders">
          Menu
        </Link>
      </div>

      <Switch>
        <Route path="/restaurant">
          <RestaurantDisplay />
        </Route>
        <Route path="/menu">
          <MenuDisplay menu={menu}/>
        </Route>
        <Route path="/orders">
          <OrderDisplay />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
