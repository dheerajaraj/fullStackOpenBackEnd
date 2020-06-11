import React, { useState, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RestaurantDisplay from "./components/RestaurantDisplay";
import MenuDisplay from "./components/MenuDisplay";
import Home from "./components/Home";
import { initializeRestaurants } from "./reducers/RestReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [restSelection, setRestSelection] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const padding = {
    padding: 5,
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(initializeRestaurants())
  }, [dispatch]);

  const ErrorMessage = () => {
    if (errorMessage === "") return <div></div>;
    return (
      <div className="error">
        <p>{errorMessage}</p>
      </div>
    );
  };

  return (
    <div>
    <Router>
      <ErrorMessage />
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/restaurant">
          restaurant
        </Link>
        {restSelection.id ? (
          <Link style={padding} to="/menu">
            Menu
          </Link>
        ) : (
          <p></p>
        )}
      </div>

      <Switch>
        <Route path="/restaurant">
          <RestaurantDisplay setRestSelection={setRestSelection} />
        </Route>
        <Route path="/menu:restId">
          {restSelection.id ? (
            <MenuDisplay rest={restSelection} setErrorMessage={setErrorMessage}/>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </div>
  );
};

export default App;